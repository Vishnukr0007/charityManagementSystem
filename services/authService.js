import { Admin, AuthAccount, LoginAttempt } from '../models/index.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import { Op } from 'sequelize';

// Security: Check if user is locked
export const checkUserLock = (account) => {
  if (!account) return null;

  if (account.account_status === "VERIFY_REQUIRED" || account.manual_unlock_required) {
    return { status: 403, message: "Account locked. Please verify to unlock." };
  }

  if (account.lock_until && new Date(account.lock_until) > new Date()) {
    return { status: 403, message: "Your account has been blocked, try again later" };
  }

  return null;
};

// Security: Progressive Throttling
export const checkThrottle = async (account, ipAddress) => {
  let isThrottled = false;
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  let userFailures5m = 0;
  let lastUserFailure = null;
  if (account) {
    userFailures5m = await LoginAttempt.count({
      where: { authAccountId: account.id, status: "FAIL", createdAt: { [Op.gte]: fiveMinsAgo } }
    });
    if (userFailures5m > 0) {
      const lastFail = await LoginAttempt.findOne({
        where: { authAccountId: account.id, status: "FAIL", createdAt: { [Op.gte]: fiveMinsAgo } },
        order: [['createdAt', 'DESC']]
      });
      lastUserFailure = lastFail?.createdAt;
    }
  }

  const ipFailures5m = await LoginAttempt.count({
    where: { ipAddress, status: "FAIL", createdAt: { [Op.gte]: fiveMinsAgo } }
  });
  
  let lastIpFailure = null;
  if (ipFailures5m > 0) {
    const lastFail = await LoginAttempt.findOne({
      where: { ipAddress, status: "FAIL", createdAt: { [Op.gte]: fiveMinsAgo } },
      order: [['createdAt', 'DESC']]
    });
    lastIpFailure = lastFail?.createdAt;
  }

  const maxFailures5m = Math.max(userFailures5m, ipFailures5m);
  
  if (maxFailures5m >= 5) {
    const breachCount = maxFailures5m - 4; 
    const delaySeconds = 30 * Math.pow(2, breachCount - 1);
    
    let mostRecentFailureTime = lastIpFailure;
    if (lastUserFailure && (!lastIpFailure || lastUserFailure > lastIpFailure)) {
      mostRecentFailureTime = lastUserFailure;
    }

    if (mostRecentFailureTime) {
      const timeSinceLastFail = (Date.now() - mostRecentFailureTime.getTime()) / 1000;
      if (timeSinceLastFail < delaySeconds) {
        isThrottled = true;
      }
    }
  }
  return isThrottled;
};

// Security: Handle Login Success
export const handleLoginSuccess = async (account, ipAddress) => {
  await account.update({
    account_status: "ACTIVE",
    lock_until: null,
    lock_count: 0,
    manual_unlock_required: false,
    otp_code: null,
    otp_expiry: null,
    otp_attempts: 0
  });

  await LoginAttempt.create({
    authAccountId: account.id,
    ipAddress,
    status: "SUCCESS",
  });
};

// Security: Handle Login Failure
export const handleLoginFailure = async (account, ipAddress) => {
  const authAccountId = account ? account.id : null;
  
  await LoginAttempt.create({
    authAccountId,
    ipAddress,
    status: "FAIL",
  });

  if (account) {
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    const userFailures15m = await LoginAttempt.count({
      where: { authAccountId: account.id, status: "FAIL", createdAt: { [Op.gte]: fifteenMinsAgo } }
    });

    if (userFailures15m >= 10) {
      const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      let newLockCount = (account.lock_count || 0);

      const lastLockExpired = account.last_lock_time ? new Date(new Date(account.last_lock_time).getTime() + 15 * 60 * 1000) : null;
      if (!lastLockExpired || new Date() > lastLockExpired) {
        newLockCount += 1;
      }

      if (account.last_lock_time && new Date(account.last_lock_time) < twentyFourHoursAgo) {
        newLockCount = 1;
      }

      let manualUnlock = newLockCount >= 3;

      await account.update({
        lock_until: lockUntil,
        lock_count: newLockCount,
        last_lock_time: new Date(),
        manual_unlock_required: manualUnlock,
        account_status: manualUnlock ? "VERIFY_REQUIRED" : "TEMP_LOCK"
      });

      if (manualUnlock) {
         return { status: 403, message: "Account locked. Please verify to unlock." };
      } else {
         return { status: 403, message: "Your account has been blocked, try again later" };
      }
    }
  }

  return { status: 401, message: "Invalid credentials" };
};

// Validates credentials and returns the token
const adminLogin = async (email, password, ipAddress) => {
  const account = await AuthAccount.findOne({ where: { email } });

  // 1. Lock Check
  const lockError = checkUserLock(account);
  if (lockError) throw new Error(lockError.message);

  // 2. Throttle Check
  const isThrottled = await checkThrottle(account, ipAddress);
  if (isThrottled) throw new Error("Too many login attempts. Please try again later");

  if (!account) {
    await handleLoginFailure(null, ipAddress);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    const failure = await handleLoginFailure(account, ipAddress);
    throw new Error(failure.message);
  }

  // 3. Success
  await handleLoginSuccess(account, ipAddress);

  const token = generateToken(account.ref_id, account.role);
  return {
    token,
    admin: account, // For compatibility, though we might want to fetch actual Admin profile
  };
};

// Helper function to create an initial admin account if one doesn't exist
const createInitialAdmin = async (name, email, password) => {
  const exists = await AuthAccount.findOne({ where: { email } });
  if (exists) return exists;

  const admin = await Admin.create({ name });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return await AuthAccount.create({
    email,
    password: hashedPassword,
    role: 'Admin',
    ref_id: admin.id
  });
};

export {
  adminLogin,
  createInitialAdmin,
};
