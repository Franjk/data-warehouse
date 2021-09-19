const express = require('express');
const authenticator = require('../middlewares/authenticator');
const authorizer = require('../middlewares/authorizer');

const authRouter = require('./auth.routes');
const channelsRouter = require('./channels.routes');
const citiesRouter = require('./cities.routes');
const companiesRouter = require('./companies.routes');
const contactsRouter = require('./contacts.routes');
const countriesRouter = require('./countries.routes');
const regionsRouter = require('./regions.routes');
const usersRouter = require('./users.routes');

const router = express.Router();

router.use('/auth', authRouter);

router.use(authenticator, authorizer('BASICO'), '/channels', channelsRouter);
router.use(authenticator, authorizer('BASICO'), '/cities', citiesRouter);
router.use(authenticator, authorizer('BASICO'), '/companies', companiesRouter);
router.use(authenticator, authorizer('BASICO'), '/contacts', contactsRouter);
router.use(authenticator, authorizer('BASICO'), '/countries', countriesRouter);
router.use(authenticator, authorizer('BASICO'), '/regions', regionsRouter);
router.use(authenticator, authorizer(), '/users', usersRouter);

module.exports = router;
