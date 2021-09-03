const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Contact = sequelize.define('contact', {
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  position: {
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
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interest: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      max: 100,
      min: 0,
    }
  },
}, {
  sequelize,
  tableName: 'Contacts',
});

module.exports = Contact;
