const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Region = sequelize.define('region', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Regions',
});

module.exports = Region;
