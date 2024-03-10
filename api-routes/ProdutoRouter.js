class ProdutoRouter {
    constructor(produtoController) {
        this.controller = produtoController;
    }

    register(router) {
        router.get('/produtos', this.controller.listarProdutos);
        router.get('/produtos/:id', this.controller.listarProdutoPorId);
        router.post('/produtos', this.controller.cadastrarProduto);
        router.put('/produtos/:id', this.controller.editarProduto);
        router.delete('/produtos/:id', this.controller.excluirProduto);
    }
}

module.exports = ProdutoRouter