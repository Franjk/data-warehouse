const { Op } = require('sequelize');
const { City } = require('../models');

exports.create = async (req, res) => {
  const {
    name, countryId,
  } = req.body;

  try {
    const newCity = await City.create({
      name, countryId,
    });
    res.status(201).send(newCity);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, name, countryId,
  } = req.query;
  const query = {};
  const where = {};

  if (name) where.name = { [Op.like]: `%${name}%` };
  if (countryId) where.precio = countryId;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const cities = await City.findAll(query);
    res.send(cities);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { cityId } = req.params;
  const query = {};

  query.where = { id: cityId };

  try {
    const city = await City.findOne(query);
    if (city) {
      res.send(city);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { cityId } = req.params;
  const {
    name, countryId,
  } = req.body;
  const query = {};

  query.where = { id: cityId };

  try {
    const updateCount = await City.update({
      name, countryId,
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
  const { cityId } = req.params;
  const query = {};

  query.where = { id: cityId };

  try {
    const deletedCount = await City.destroy(query);
    if (deletedCount) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
