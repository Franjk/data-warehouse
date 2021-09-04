const { Op } = require('sequelize');
const { Contact, City, Country, Region, ContactChannel, Company, Channel } = require('../models');

const fullStateInclude = [
  {
    model: City,
    attributes: ['name'],
    include: {
      model: Country,
      attributes: ['name'],
      include: {
        model: Region,
        attributes: ['name']
      }
    },
  },
  {
    model: ContactChannel,
    include: {
      model: Channel,
      attributes: ['name']
    }
  },
  {
    model: Company,
    attributes: ['name']
  }
];

exports.create = async (req, res) => {
  const {
    firstName, lastName, position, email, address, interest, companyId, cityId, 
  } = req.body;

  try {
    const newContact = await Contact.create({
      firstName, lastName, position, email, address, interest, companyId, cityId, 
    });
    res.status(201).send(newContact);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const {
    fullState, limit, offset, firstName, lastName, position, email, address, interest, companyId, cityId, 
  } = req.query;
  const query = {};
  const where = {};

  if (fullState == 'true') query.include = fullStateInclude;

  if (firstName) where.firstName = { [Op.like]: `%${firstName}%` };
  if (lastName) where.lastName = { [Op.like]: `%${lastName}%` };
  if (position) where.position = { [Op.like]: `%${position}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (interest) where.interest = interest;
  if (companyId) where.companyId = companyId;
  if (cityId) where.cityId = cityId;

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const contacts = await Contact.findAll(query);
    res.send(contacts);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { contactId } = req.params;
  const { fullState } = req.query;
  const query = {};

  query.where = { id: contactId };
  
  if (fullState == 'true') query.include = fullStateInclude;

  try {
    const contact = await Contact.findOne(query);
    
    if (contact) {
      res.send(contact);
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.update = async (req, res) => {
  const { contactId } = req.params;
  const {
    firstName, lastName, position, email, address, interest, companyId, cityId, 
  } = req.body;
  const query = {};

  query.where = { id: contactId };

  try {
    const updateCount = await Contact.update({
      firstName, lastName, position, email, address, interest, companyId, cityId, 
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
  const { contactId } = req.params;
  const query = {};

  query.where = { id: contactId };

  try {
    const deletedCount = await Contact.destroy(query);
    if (deletedCount > 0) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
