const express = require('express');
const { cityController } = require('../controllers');

const router = express.Router();

router.post('/', cityController.create);

router.get('/', cityController.readAll);

router.get('/:cityId', cityController.readOne);

router.put('/:cityId', cityController.update);

router.delete('/:cityId', cityController.delete);

module.exports = router;
