const express = require('express');
const { companyController } = require('../controllers');

const router = express.Router();

router.post('/', companyController.create);

router.get('/', companyController.readAll);

router.delete('/', companyController.bulkDelete);

router.get('/:companyId', companyController.readOne);

router.put('/:companyId', companyController.update);

router.delete('/:companyId', companyController.delete);

module.exports = router;
