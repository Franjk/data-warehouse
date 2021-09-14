const { Op } = require('sequelize');
const sequelize = require('../db/connection');
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
    firstName, lastName, position, email, address, interest, companyId, cityId, channels
  } = req.body;

  const t = await sequelize.transaction();
  try {

    const newContact = await Contact.create({
      firstName, lastName, position, email, address, interest, companyId, cityId, 
    }, { transaction: t });

    if (channels && channels.length > 0) {

      const channelsWithContactId = channels.map(c => {
        return {
          ...c,
          contactId: newContact.id,
        };
      });
  
      const newContactChannels = await ContactChannel.bulkCreate(channelsWithContactId, {validate: true, transaction: t});
  
      newContact.setDataValue('channels', newContactChannels);
    }


    await t.commit();
    res.status(201).send(newContact);

  } catch (err) {
    await t.rollback();
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
    firstName, lastName, position, email, address, interest, companyId, cityId, channels
  } = req.body;
  const query = {};
  const t = await sequelize.transaction();

  query.where = { id: contactId };
  query.t = t;

  const updatedAt = new Date().toISOString(); // lo agrego para que el updateCount de mayor a 0 si encuentra algo con la query
  console.log('updatedAt', updatedAt);

  try {
    let [updateCount] = await Contact.update({
      firstName, lastName, position, email, address, interest, companyId, cityId, updatedAt
    }, query);

    console.log('updatedCount', updateCount, );
  


    console.log('channels', channels);
    if (channels) {
      const deletedCount = await ContactChannel.destroy({where: {contactId}}, {transaction: t});

      console.log('deleteCound', deletedCount);
      if (deletedCount > 0) updateCount += 1;

      if (channels.length > 0) {
        const channelsWithContactId = channels.map(c => {
          return {
            ...c,
            contactId: contactId,
          };
        });
        await ContactChannel.bulkCreate(channelsWithContactId, {validate: true, transaction: t});
        
      }
    }

    if (updateCount === 0) {
      await t.rollback();
      res.send({ err: 'Not found' });
      return;
    }

    await t.commit();

    res.send({ msg: `${updateCount} updated` });

    
  } catch (err) {
    await t.rollback();
    console.log(err);
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

exports.bulkDelete = async (req, res) => {
  const { contacts } = req.body;
  const query = {};

  console.log('contacts', contacts);

  query.where = { id: contacts };

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
