const express = require('express');
const { contactChannelController } = require('../controllers');

const router = express.Router();

router.post('/', contactChannelController.create);

router.get('/', contactChannelController.readAll);

router.get('/:channelId', contactChannelController.readOne);

router.put('/:channelId', contactChannelController.update);

router.delete('/:channelId', contactChannelController.delete);

module.exports = router;
