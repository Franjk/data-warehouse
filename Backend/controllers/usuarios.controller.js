const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');

exports.create = async (req, res) => {
  const {
    username, nombre, telefono, email, direccion, password, rol,
  } = req.body;

  try {
    const newUsuario = await Usuario.create({
      username, nombre, telefono, email, direccion, password, rol,
    });
    res.status(201).send(newUsuario);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo crear el usuario' }); // en el futuro mandar solo el error message
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, username, nombre, telefono, email, direccion, rol,
  } = req.query;
  const query = {};
  const where = {};

  if (nombre) where.nombre = { [Op.like]: `%${nombre}%` };
  if (username) where.username = { [Op.like]: `%${username}%` };
  if (telefono) where.telefono = { [Op.like]: `%${telefono}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (direccion) where.direccion = { [Op.like]: `%${direccion}%` };
  if (rol) where.rol = { [Op.like]: `%${rol}%` };

  query.where = where;
  query.attributes = { exclude: ['password'] }; // se omite password
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const usuarios = await Usuario.findAll(query);
    res.send(usuarios);
  } catch (err) {
    res.status(400).send({ error: 'No se pudo recuperar el usuario' });
  }
};

exports.readOne = async (req, res) => {
  const { usuarioId } = req.params;
  const query = {};

  query.attributes = { exclude: ['password'] };
  query.where = { id: usuarioId };

  try {
    const usuario = await Usuario.findOne(query);
    if (usuario) {
      res.send(usuario);
    } else {
      res.send({ error: `Usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo recuperar el usuario' });
  }
};

exports.update = async (req, res) => {
  const { usuarioId } = req.params;
  const {
    username, nombre, telefono, email, direccion, rol,
  } = req.body;
  const query = {};

  query.where = { id: usuarioId };

  try {
    const updateCount = await Usuario.update({
      username, nombre, telefono, email, direccion, rol,
    }, query);

    if (updateCount > 0) {
      res.send({ message: `Usuario ${usuarioId} actualizado` });
    } else {
      res.send({ error: `Usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo actualizar el usuario' });
  }
};

exports.delete = async (req, res) => {
  const { usuarioId } = req.params;
  const query = {};

  query.where = { id: usuarioId };

  try {
    const deletedCount = await Usuario.destroy(query);
    if (deletedCount > 0) {
      res.send({ message: `Usuario ${usuarioId} eliminado` });
    } else {
      res.send({ error: `Usuario ${usuarioId} no encontrado` });
    }
  } catch (err) {
    res.status(400).send({ error: 'No se pudo eliminar el usuario' });
  }
};
