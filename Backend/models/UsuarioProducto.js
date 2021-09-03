// const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const UsuarioProducto = sequelize.define('usuarioProducto', {}, {
  sequelize,
  tableName: 'UsuarioProductos',
  timestamps: false,
});

module.exports = UsuarioProducto;
