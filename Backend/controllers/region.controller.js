const { Op } = require('sequelize');
const { Region } = require('../models');

exports.create = async (req, res) => {
  const {
    name,
  } = req.body;

  try {
    const newRegion = await Region.create({
      name,
    });
    res.status(201).send(newRegion);
  } catch (err) {
    res.status(400).send({ err }); // en el futuro mandar solo el error message
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
    const regions = await Region.findAll(query);
    res.send(regions);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { regionId } = req.params;
  const query = {};

  query.where = { id: regionId };

  try {
    const region = await Region.findOne(query);
    if (region) {
      res.send(region);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { regionId } = req.params;
  const {
    name,
  } = req.body;
  const query = {};

  query.where = { id: regionId };

  try {
    const updateCount = await Region.update({
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
  const { regionId } = req.params;
  const query = {};

  query.where = { id: regionId };

  try {
    const deletedCount = await Region.destroy(query);
    if (deletedCount) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
