const express = require('express');
const authRouter = require('./auth.routes');
// const authenticator = require('../middlewares/authenticator');

const channelsRouter = require('./channels.routes');
const citiesRouter = require('./cities.routes');
const companiesRouter = require('./companies.routes');
const contactsRouter = require('./contacts.routes');
const countriesRouter = require('./countries.routes');
const regionsRouter = require('./regions.routes');
const usersRouter = require('./users.routes');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/channels', channelsRouter);
router.use('/cities', citiesRouter);
router.use('/companies', companiesRouter);
router.use('/contacts', contactsRouter);
router.use('/countries', countriesRouter);
router.use('/regions', regionsRouter);
router.use('/users', usersRouter);

module.exports = router;
