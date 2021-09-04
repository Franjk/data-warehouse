const { Op } = require('sequelize');
const {  ContactChannel } = require('../models');

exports.create = async (req, res) => {
  const { contactId } = req.params;
  const {
    channelId, account, preference,
  } = req.body;

  try {
    const newContactChannel = await ContactChannel.create({
      contactId, channelId, account, preference,
    });
    res.status(201).send(newContactChannel);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readAll = async (req, res) => {
  const { contactId } = req.params;
  const {
    limit, offset, channelId, account, preference,
  } = req.query;
  const query = {};
  const where = {};
  
  if (contactId) where.contactId = contactId;
  if (channelId) where.channelId = channelId;
  if (account) where.account = { [Op.like]: `%${account}%` };
  if (preference) where.preference = { [Op.like]: `%${preference}%` };

  query.where = where;
  if (limit) query.limit = Number.parseInt(limit, 10);
  if (offset) query.offset = Number.parseInt(offset, 10);

  try {
    const contactChannels = await ContactChannel.findAll(query);
    res.send(contactChannels);
  } catch (err) {
    res.status(400).send({ err });
  }
};

exports.readOne = async (req, res) => {
  const { contactId, channelId } = req.params;
  const query = {};

  query.where = { contactId, channelId };

  try {
    const company = await ContactChannel.findOne(query);
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
  const { contactId, channelId } = req.params;
  const {
    account, preference,
  } = req.body;
  const query = {};

  query.where = { contactId, channelId };

  try {
    const updateCount = await ContactChannel.update({
      account, preference,
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
  const { contactId, channelId } = req.params;
  const query = {};

  query.where = { contactId, channelId };

  try {
    const deletedCount = await ContactChannel.destroy(query);
    if (deletedCount > 0) {
      res.send({ msg: `${deletedCount} deleted` });
    } else {
      res.send({ err: 'Not found' });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};
