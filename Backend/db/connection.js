const { Sequelize } = require('sequelize');

const {
  DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  // logging: (...msg) => console.log(msg),
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
