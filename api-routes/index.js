const express = require('express');
const router = express.Router();

const CategoriaRouter = require('./CategoriaRouter');
const ProdutoRouter = require('./ProdutoRouter');

const CategoriaController = require('../controllers/CategoriaController');
const ProdutoController = require('../controllers/ProdutoController');

const categoriaRouter = new CategoriaRouter(new CategoriaController);
const produtoRouter = new ProdutoRouter(new ProdutoController);

categoriaRouter.register(router);
produtoRouter.register(router);

module.exports = router;
