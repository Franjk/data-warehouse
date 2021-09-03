const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const PedidoProducto = sequelize.define('pedidoProducto', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.DOUBLE,
  },
}, {
  sequelize,
  tableName: 'PedidoProductos',
  timestamps: false,
});

module.exports = PedidoProducto;
