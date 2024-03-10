const ProdutoService = require('../services/ProdutoService');
const produtoService = new ProdutoService;

class ProdutoController {
  constructor() {}

  async listarProdutos(req, res) {
    try {
      const produtos = await produtoService.listar();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarProdutoPorId(req, res) {
    try {
      const id = req.params.id;
      const produto = await produtoService.listarPorId(parseInt(id));
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cadastrarProduto(req, res) {
    try {
      const produto = req.body;
      await produtoService.cadastrar(produto);
      res.json({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async editarProduto(req, res) {
    try {
      const id = req.params.id;
      const produto = req.body;
      await produtoService.editar(parseInt(id), produto);
      res.json({ message: 'Produto editado com sucesso!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async excluirProduto(req, res) {
    try {
      const id = req.params.id;
      await produtoService.excluir(parseInt(id));
      res.json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;
