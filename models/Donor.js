const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Donor = sequelize.define('Donor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Donor;
