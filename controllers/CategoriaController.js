const CategoriaService = require('../services/CategoriaService');
const categoriaService = new CategoriaService

class CategoriaController {
  async listarCategorias(req, res) {
    try {
      const categorias = await categoriaService.listar();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cadastrarCategoria(req, res) {
    if (Object.keys(req.body).length > 0) {
      try {
        const categoria = req.body;
        const novaCategoria = await categoriaService.cadastrar(categoria);
        res.json({ message: 'Categoria cadastrada com sucesso!', categoria: novaCategoria });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ "error": "Não foi possivel realizar sua solicitação, faça uma requisição com um corpo." });
    }


  }

  async editarCategoria(req, res) {

    if (Object.keys(req.body).length > 0) {
      try {
        const id = req.params.id;
        const categoria = req.body;
        const categoriaAtualizada = await categoriaService.editar(parseInt(id), categoria);
        res.json({ message: 'Categoria editada com sucesso!', categoria: categoriaAtualizada });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Não foi possivel realizar sua solicitação, faça uma requisição com um corpo." })
    }
  }

  async excluirCategoria(req, res) {
    try {
      const id = req.params.id;
      await categoriaService.excluir(parseInt(id));
      res.json({ message: 'Categoria excluída com sucesso!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CategoriaController;