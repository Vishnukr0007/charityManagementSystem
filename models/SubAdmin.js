import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SubAdmin = sequelize.define('SubAdmin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default SubAdmin;
