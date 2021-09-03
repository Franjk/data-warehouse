const express = require('express');
const usuarioProductosController = require('../controllers/usuarioProductos.controller');

const router = express.Router({ mergeParams: true });

router.post('/', usuarioProductosController.create);

router.get('/', usuarioProductosController.readAll);

router.get('/:productoId', usuarioProductosController.readOne);

router.delete('/:productoId', usuarioProductosController.delete);

module.exports = router;
