const { Op } = require('sequelize');
const { Company } = require('../models');

exports.create = async (req, res) => {
  const {
    name, address, email, phoneNumber, cityId,
  } = req.body;

  try {
    const newCompany = await Company.create({
      name, address, email, phoneNumber, cityId,
    });
    res.status(201).send(newCompany);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    limit, offset, name, address, email, phoneNumber, cityId,
  } = req.query;
  const query = {};
  const where = {};

  if (name) where.name = { [Op.like]: `%${name}%` };
  if (phoneNumber) where.phoneNumber = { [Op.like]: `%${phoneNumber}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (cityId) where.cityId = cityId;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const companies = await Company.findAll(query);
    res.send(companies);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { companyId } = req.params;
  const query = {};

  query.where = { id: companyId };

  try {
    const company = await Company.findOne(query);
    if (company) {
      res.send(company);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { companyId } = req.params;
  const {
    name, address, email, phoneNumber, cityId,
  } = req.body;
  const query = {};

  query.where = { id: companyId };

  try {
    const updateCount = await Company.update({
      name, address, email, phoneNumber, cityId,
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
  const { companyId } = req.params;
  const query = {};

  query.where = { id: companyId };

  try {
    const deletedCount = await Company.destroy(query);
    if (deletedCount > 0) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
