const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['ADMIN', 'BASICO']],
    },
    allowNull: false,
    defaultValue: 'BASICO',
  },
}, {
  sequelize,
  tableName: 'Users',
});

module.exports = User;
