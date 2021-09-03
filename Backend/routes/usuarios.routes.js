const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const authorize = require('../middlewares/authorizer');
const usuariosFavoritosRouter = require('./usuariosFavoritos.routes');

const router = express.Router();

router.post('/', authorize(), usuariosController.create);

router.get('/', authorize(), usuariosController.readAll);

router.get('/:usuarioId', authorize('CLIENTE'), usuariosController.readOne);

router.put('/:usuarioId', authorize('CLIENTE'), usuariosController.update);

router.delete('/:usuarioId', authorize('CLIENTE'), usuariosController.delete);

router.use('/:usuarioId/favoritos', authorize('CLIENTE'), usuariosFavoritosRouter);

module.exports = router;
