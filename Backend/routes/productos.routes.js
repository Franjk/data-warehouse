const express = require('express');
const productosController = require('../controllers/productos.controller');
const authorize = require('../middlewares/authorizer');

const router = express.Router();

router.post('/', authorize(), productosController.create);

router.get('/', authorize('CLIENTE'), productosController.readAll);

router.get('/:productoId', authorize('CLIENTE'), productosController.readOne);

router.put('/:productoId', authorize(), productosController.update);

router.delete('/:productoId', authorize(), productosController.delete);

module.exports = router;
