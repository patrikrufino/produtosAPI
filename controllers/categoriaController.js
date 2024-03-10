const categoriaService = require('../services/categoriaService');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.listar();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cadastrarCategoria = async (req, res) => {
  try {
    const categoria = req.body;
    console.log(req.body);
    await categoriaService.cadastrar(categoria);
    res.json({ message: 'Categoria cadastrada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = req.body;
    await categoriaService.editar(parseInt(id), categoria);
    res.json({ message: 'Categoria editada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const excluirCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    await categoriaService.excluir(parseInt(id));
    res.json({ message: 'Categoria excluída com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { listarCategorias, cadastrarCategoria, editarCategoria, excluirCategoria };