const { Op } = require('sequelize');
const {
  Pedido, Producto, PedidoProducto, Usuario,
} = require('../models');

exports.create = async (req, res) => {
  const {
    estado, formaDePago, pedidoProductos,
  } = req.body;
  let { usuarioId } = req.body;

  // Cuando es CLIENTE toma el usuarioId del token, en cambio para cuando es ADMIN
  // se tiene que introducir el usuario id en el body.
  if (req.auth.rol === 'CLIENTE') usuarioId = req.auth.id;

  const query = {};

  try {
    query.where = { id: usuarioId };
    const usuarioData = await Usuario.findOne(query);
    const { direccion } = usuarioData;

    query.where = { id: { [Op.in]: pedidoProductos.map((el) => el.productoId) } };
    const productosData = await Producto.findAll(query);

    productosData.forEach((pd) => {
      const pedidoProducto = pedidoProductos.find((el) => el.productoId === pd.id);
      pedidoProducto.precioUnitario = pd.precio;
    });

    const newPedido = await Pedido.create(
      {
        estado, formaDePago, usuarioId, direccion, pedidoProductos,
      },
      {
        include: PedidoProducto,
      },
    );

    res.status(201).send(newPedido);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo crear el pedido', err }); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, estado, formaDePago, total, minTotal, maxTotal,
  } = req.query;
  let { usuarioId } = req.query;

  const query = {};
  const where = {};

  if (req.auth.rol === 'CLIENTE') usuarioId = req.auth.id;

  if (estado) where.estado = { [Op.like]: `%${estado}%` };
  if (formaDePago) where.formaDePago = { [Op.like]: `%${formaDePago}%` };
  if (usuarioId) where.usuarioId = usuarioId;

  if (minTotal) where.precio = { [Op.gte]: minTotal };
  if (maxTotal) where.precio = { [Op.lte]: maxTotal };
  if (minTotal && maxTotal) where.precio = { [Op.gte]: minTotal, [Op.lte]: maxTotal };
  if (total) where.total = total;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);
  query.include = [
    {
      model: PedidoProducto,
      attributes: { exclude: ['pedidoId'] },
    },
  ];

  try {
    const productos = await Pedido.findAll(query);
    res.send(productos);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo recuperar el pedido' });
  }
};

exports.readOne = async (req, res) => {
  const { pedidoId } = req.params;
  const query = {};

  query.where = { id: pedidoId };
  query.include = [
    {
      model: PedidoProducto,
      attributes: ['cantidad'],
      include: {
        model: Producto,
        attributes: ['id', 'precio', 'nombre'],
      },
    },
  ];

  try {
    const producto = await Pedido.findOne(query);
    if (producto) {
      if (req.auth.rol === 'CLIENTE' && producto.usuarioId != req.auth.id) return res.status(403).send({ error: 'No autorizado' });
      return res.send(producto);
    }
    return res.send({ error: `Pedido ${pedidoId} no encontrado` });
  } catch (err) {
    return res.status(400).send({ error: 'No se pudo recuperar el pedido' });
  }
};

exports.update = async (req, res) => {
  const { pedidoId } = req.params;
  const {
    estado, formaDePago,
  } = req.body;
  const query = {};

  query.where = { id: pedidoId };

  try {
    const updateCount = await Pedido.update({
      estado, formaDePago,
    }, query);

    if (updateCount) {
      res.send({ message: `Pedido ${pedidoId} actualizado` });
    } else {
      res.send({ error: `Pedido ${pedidoId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo actualizar el pedido' });
  }
};

exports.delete = async (req, res) => {
  const { pedidoId } = req.params;
  const query = {};

  query.where = { id: pedidoId };

  try {
    const deletedCount = await Pedido.destroy(query);
    if (deletedCount) {
      res.send({ message: `Pedido ${pedidoId} eliminado` });
    } else {
      res.send({ error: `Pedido ${pedidoId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo eliminar el pedido' });
  }
};
