import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  goal_amount: {
    type: DataTypes.FLOAT,
  },
}, {
  timestamps: true,
});

export default Charity;
