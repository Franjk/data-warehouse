const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const City = sequelize.define('city', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Cities',
});

module.exports = City;
