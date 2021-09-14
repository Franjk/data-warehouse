const express = require('express');
const { contactController } = require('../controllers');
const contactChannelRouter = require('./contactChannel.routes');

const router = express.Router();

router.post('/', contactController.create);

router.get('/', contactController.readAll);

router.delete('/', contactController.bulkDelete);

router.get('/:contactId', contactController.readOne);

router.put('/:contactId', contactController.update);

router.delete('/:contactId', contactController.delete);

router.use('/:contactId/channels', contactChannelRouter);

module.exports = router;
