const produtoService = require('../services/produtoService');

const listarProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.listar();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarProdutoPorId = async(req, res) => {
  try {
    const id = req.params.id;
    const produto = await produtoService.listarPorId(parseInt(id));
    res.json(produto);
    console.log(req.params);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 

const cadastrarProduto = async (req, res) => {
  try {
    const produto = req.body;
    await produtoService.cadastrar(produto);
    res.json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produto = req.body;
    await produtoService.editar(parseInt(id), produto);
    res.json({ message: 'Produto editado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const excluirProduto = async (req, res) => {
  try {
    const id = req.params.id;
    await produtoService.excluir(parseInt(id));
    res.json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { listarProdutos, listarProdutoPorId, cadastrarProduto, editarProduto, excluirProduto };
