const express = require('express');
const { channelController } = require('../controllers');

const router = express.Router();

router.post('/', channelController.create);

router.get('/', channelController.readAll);

router.get('/:channelId', channelController.readOne);

router.put('/:channelId', channelController.update);

router.delete('/:channelId', channelController.delete);

module.exports = router;
