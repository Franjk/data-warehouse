const express = require('express');
const { regionController } = require('../controllers');

const router = express.Router();

router.post('/', regionController.create);

router.get('/', regionController.readAll);

router.get('/:regionId', regionController.readOne);

router.put('/:regionId', regionController.update);

router.delete('/:regionId', regionController.delete);

module.exports = router;
