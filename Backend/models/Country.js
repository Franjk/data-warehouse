const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Country = sequelize.define('country', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Countries',
});

module.exports = Country;
