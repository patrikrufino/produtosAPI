const ProdutoService = require('../services/ProdutoService');
const produtoService = new ProdutoService;
const ProdutoNaoEncontradoError = require("../utils/ProdutoNaoEncontradoError")

class ProdutoController {
  constructor() { }

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
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'O ID do produto deve ser um número.' });
      }

      const produto = await produtoService.listarPorId(id);

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cadastrarProduto(req, res) {
    if (Object.keys(req.body).length > 0) {
      try {
        const produto = req.body;
        produto.categoria_id = parseInt(produto.categoria_id);
        const novoProduto = await produtoService.cadastrar(produto);
        res.json({ message: 'Produto cadastrado com sucesso!', novo_produto: novoProduto });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Não foi possivel realizar sua solicitação, faça uma requisição com um corpo." })
    }
  }

  async editarProduto(req, res) {
    if (Object.keys(req.body).length > 0) {
      try {
        const id = req.params.id;
        const produto = req.body;
        produto.categoria_id = parseInt(produto.categoria_id);

        if (isNaN(id)) {
          return res.status(400).json({ error: 'O ID do produto deve ser um número.' });
        }

        const produtoAtualizado = await produtoService.editar(parseInt(id), produto);
        res.json({ message: 'Produto editado com sucesso!', produto_atualizado: produtoAtualizado });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Não foi possivel realizar sua solicitação, faça uma requisição com um corpo." })
    }
  }

  async excluirProduto(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'O ID do produto deve ser um número.' });
      }

      await produtoService.excluir(id);

      res.json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {

      if (error instanceof ProdutoNaoEncontradoError) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;
