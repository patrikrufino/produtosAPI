const express = require("express");
const router = express.Router();

const { listarCategorias, cadastrarCategoria, editarCategoria, excluirCategoria } = require('../controllers/categoriaController');
const { listarProdutos, listarProdutoPorId, cadastrarProduto, editarProduto, excluirProduto } = require('../controllers/produtoController');

// Rotas para categorias
router.get('/categorias', listarCategorias);
router.post('/categorias', cadastrarCategoria);
router.put('/categorias/:id', editarCategoria);
router.delete('/categorias/:id', excluirCategoria);

// Rotas para produtos
router.get('/produtos', listarProdutos);
router.get('/produtos/:id', listarProdutoPorId);
router.post('/produtos', cadastrarProduto);
router.put('/produtos/:id', editarProduto);
router.delete('/produtos/:id', excluirProduto);

module.exports = router;
