const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Channel = sequelize.define('channel', {
  name: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Channels',
});

module.exports = Channel;
