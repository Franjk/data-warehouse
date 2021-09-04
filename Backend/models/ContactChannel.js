const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ContactChannel = sequelize.define('contactChannel', {
  account: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  preference: {
    type: DataTypes.STRING(20),
    validate: {
      isIn: [['FAVORITE', 'DONT_DISTURB', 'NO_PREFERENCE']],
    },
    allowNull: false,
    defaultValue: 'DONT_DISTURB',
  },
}, {
  sequelize,
  tableName: 'ContactsChannels',
  timestamps: false,
});

module.exports = ContactChannel;
