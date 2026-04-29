const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Charity = sequelize.define('Charity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

module.exports = Charity;
