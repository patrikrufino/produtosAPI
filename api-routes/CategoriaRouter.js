class CategoriaRouter {
    constructor(categoriaController) {
        this.controller = categoriaController;
    }

    register(router) {
        router.get('/categorias', this.controller.listarCategorias);
        router.post('/categorias', this.controller.cadastrarCategoria);
        router.put('/categorias/:id', this.controller.editarCategoria);
        router.delete('/categorias/:id', this.controller.excluirCategoria);
    }
}

module.exports = CategoriaRouter;
