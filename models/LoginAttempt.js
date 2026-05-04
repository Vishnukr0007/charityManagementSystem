import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LoginAttempt = sequelize.define('LoginAttempt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  authAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true, // may be null if account doesn't exist
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('SUCCESS', 'FAIL'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default LoginAttempt;
