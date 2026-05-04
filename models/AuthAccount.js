import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const AuthAccount = sequelize.define('AuthAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Sub Admin', 'Donor', 'Charity'),
    allowNull: false,
  },
  ref_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Security Fields
  lock_until: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lock_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  last_lock_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  manual_unlock_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  account_status: {
    type: DataTypes.ENUM('ACTIVE', 'TEMP_LOCK', 'VERIFY_REQUIRED', 'SUSPICIOUS'),
    defaultValue: 'ACTIVE',
  },
  otp_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otp_expiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  otp_attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default AuthAccount;
