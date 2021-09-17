const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', userController.create);

router.get('/', userController.readAll);

router.delete('/', userController.bulkDelete);

router.get('/:userId', userController.readOne);

router.put('/:userId', userController.update);

router.delete('/:userId', userController.delete);

module.exports = router;
