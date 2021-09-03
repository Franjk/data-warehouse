const { Op } = require('sequelize');
const { Country } = require('../models');

exports.create = async (req, res) => {
  const {
    name, regionId,
  } = req.body;

  try {
    const newCountry = await Country.create({
      name, regionId,
    });
    res.status(201).send(newCountry);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, name, regionId,
  } = req.query;
  const query = {};
  const where = {};

  if (name) where.name = { [Op.like]: `%${name}%` };
  if (regionId) where.precio = regionId;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const countries = await Country.findAll(query);
    res.send(countries);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { countryId } = req.params;
  const query = {};

  query.where = { id: countryId };

  try {
    const country = await Country.findOne(query);
    if (country) {
      res.send(country);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { countryId } = req.params;
  const {
    name, regionId
  } = req.body;
  const query = {};

  query.where = { id: countryId };

  try {
    const updateCount = await Country.update({
      name, regionId,
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
  const { countryId } = req.params;
  const query = {};

  query.where = { id: countryId };

  try {
    const deletedCount = await Country.destroy(query);
    if (deletedCount) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
