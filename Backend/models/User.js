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
  fullName: {
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
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['ANALYST', 'SYSADMIN']],
    },
    allowNull: false,
    defaultValue: 'ANALYST',
  },
}, {
  sequelize,
  tableName: 'Users',
});

module.exports = User;
