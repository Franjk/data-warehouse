const { Op } = require('sequelize');
const { User } = require('../models');

exports.create = async (req, res) => {
  const {
    username, password, fullName, email, phoneNumber, address, role,
  } = req.body;

  try {
    const newUser = await User.create({
      username, password, fullName, email, phoneNumber, address, role,
    });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, username, fullName, email, phoneNumber, address, role,
  } = req.query;
  const query = {};
  const where = {};

  if (username) where.username = { [Op.like]: `%${username}%` };
  if (fullName) where.fullName = { [Op.like]: `%${fullName}%` };
  if (phoneNumber) where.phoneNumber = { [Op.like]: `%${phoneNumber}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (role) where.role = { [Op.like]: `%${role}%` };

  query.where = where;
  query.attributes = { exclude: ['password'] }; // se omite password
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const users = await User.findAll(query);
    res.send(users);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { userId } = req.params;
  const query = {};

  query.attributes = { exclude: ['password'] };
  query.where = { id: userId };

  try {
    const user = await User.findOne(query);
    if (user) {
      res.send(user);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { userId } = req.params;
  const {
    username, fullName, email, phoneNumber, address, role, password,
  } = req.body;
  const query = {};

  query.where = { id: userId };

  try {
    const updateCount = await User.update({
      username, fullName, email, phoneNumber, address, role, password,
    }, query);

    if (updateCount > 0) {
      res.send({ msg: `${updateCount} updated` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req.params;
  const query = {};

  query.where = { id: userId };

  try {
    const deletedCount = await User.destroy(query);
    if (deletedCount > 0) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.bulkDelete = async (req, res) => {
  const { users } = req.body;
  const query = {};

  console.log('users', users);

  query.where = { id: users };

  try {
    const deletedCount = await User.destroy(query);
    if (deletedCount > 0) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

