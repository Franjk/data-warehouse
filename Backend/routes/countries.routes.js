const express = require('express');
const { countryController } = require('../controllers');

const router = express.Router();

router.post('/', countryController.create);

router.get('/', countryController.readAll);

router.get('/:countryId', countryController.readOne);

router.put('/:countryId', countryController.update);

router.delete('/:countryId', countryController.delete);

module.exports = router;
