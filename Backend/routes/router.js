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

router.use('/channels', authenticator, authorizer('BASICO'), channelsRouter);
router.use('/cities', authenticator, authorizer('BASICO'),citiesRouter);
router.use('/companies', authenticator, authorizer('BASICO'),companiesRouter);
router.use('/contacts', authenticator, authorizer('BASICO'),contactsRouter);
router.use('/countries', authenticator, authorizer('BASICO'),countriesRouter);
router.use('/regions', authenticator, authorizer('BASICO'),regionsRouter);
router.use('/users', authenticator, authorizer(''),usersRouter);

module.exports = router;
