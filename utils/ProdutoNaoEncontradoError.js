class ProdutoNaoEncontradoError extends Error {
    constructor() {
        super('Produto não encontrado');
        this.status = 404;
    }
}

module.exports = ProdutoNaoEncontradoError;