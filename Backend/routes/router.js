const express = require('express');
const authRouter = require('./auth.routes');
const pedidosRouter = require('./pedidos.routes');
const productosRouter = require('./productos.routes');
const usuariosRouter = require('./usuarios.routes');
const authenticator = require('../middlewares/authenticator');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/usuarios', authenticator, usuariosRouter);
router.use('/productos', authenticator, productosRouter);
router.use('/pedidos', authenticator, pedidosRouter);

module.exports = router;
