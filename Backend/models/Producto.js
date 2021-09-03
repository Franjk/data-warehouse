const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Producto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  imagen: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Productos',
});

module.exports = Producto;
