const { Admin } = require('../models');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const adminLogin = async (username, password) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(admin.id, admin.role);
  return {
    token,
    admin,
  };
};

// Helper for setup: creating an initial admin
const createInitialAdmin = async (username, password) => {
  const exists = await Admin.findOne({ where: { username } });
  if (exists) return exists;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return await Admin.create({
    username,
    password: hashedPassword,
    role: 'Admin'
  });
};

module.exports = {
  adminLogin,
  createInitialAdmin,
};
