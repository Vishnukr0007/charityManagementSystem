import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  payment_method: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

export default Donation;
