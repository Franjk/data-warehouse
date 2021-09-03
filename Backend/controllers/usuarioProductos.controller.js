const { UsuarioProducto } = require('../models');

exports.create = async (req, res) => {
  const { productoId } = req.body;
  const { usuarioId } = req.params;

  try {
    const newUsuarioProducto = await UsuarioProducto.create({
      productoId, usuarioId,
    });
    res.status(201).send(newUsuarioProducto);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo crear el favorito' }); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, productoId,
  } = req.query;
  const { usuarioId } = req.params;
  const query = {};
  const where = {};

  if (productoId) where.productoId = productoId;
  if (usuarioId) where.usuarioId = usuarioId;

  query.where = where;
  query.attributes = { exclude: ['usuarioId'] };
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const productos = await UsuarioProducto.findAll(query);
    res.send(productos);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo recuperar el favorito' });
  }
};

exports.readOne = async (req, res) => {
  const { usuarioId, productoId } = req.params;
  const query = {};

  query.where = { usuarioId, productoId };
  query.attributes = { exclude: ['usuarioId'] };

  try {
    const producto = await UsuarioProducto.findOne(query);
    if (producto) {
      res.send(producto);
    } else {
      res.send({ error: `Favorito ${productoId} del usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo actualizar el favorito' });
  }
};

exports.delete = async (req, res) => {
  const { usuarioId, productoId } = req.params;
  const query = {};

  query.where = { usuarioId, productoId };

  try {
    const deletedCount = await UsuarioProducto.destroy(query);
    if (deletedCount) {
      res.send({ message: `Favorito ${productoId} del usuario ${usuarioId} eliminado` });
    } else {
      res.send({ error: `Favorito ${productoId} del usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo eliminar el favorito' });
  }
};
