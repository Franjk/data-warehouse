const { Op } = require('sequelize');
const { Channel } = require('../models');

exports.create = async (req, res) => {
  const {
    name, 
  } = req.body;

  try {
    const newChannel = await Channel.create({
      name, 
    });
    res.status(201).send(newChannel);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, name, 
  } = req.query;
  const query = {};
  const where = {};

  if (name) where.name = { [Op.like]: `%${name}%` };

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const channels = await Channel.findAll(query);
    res.send(channels);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { channelId } = req.params;
  const query = {};

  query.where = { id: channelId };

  try {
    const channel = await Channel.findOne(query);
    if (channel) {
      res.send(channel);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { channelId } = req.params;
  const {
    name, 
  } = req.body;
  const query = {};

  query.where = { id: channelId };

  try {
    const updateCount = await Channel.update({
      name, 
    }, query);

    if (updateCount) {
      res.send({ msg: `${updateCount} updated` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.delete = async (req, res) => {
  const { channelId } = req.params;
  const query = {};

  query.where = { id: channelId };

  try {
    const deletedCount = await Channel.destroy(query);
    if (deletedCount) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
