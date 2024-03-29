const { PrismaClient } = require("@prisma/client");
const StringUtils = require("../utils/StringUtils");
const utils = new StringUtils();
const ProdutoNaoEncontradoError = require("../utils/ProdutoNaoEncontradoError")

class ProdutoService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async listar() {
    try {
      const produtos = await this.prisma.produto.findMany();
      return produtos;
    } catch (error) {
      throw new Error('Erro ao listar produtos: ' + error.message);
    }
  }

  async listarPorId(id) {
    try {
      const produto = await this.prisma.produto.findFirst({
        where: { id },
      });

      if (!produto) {
        throw new ProdutoNaoEncontradoError();
      }

      return produto;
    } catch (error) {
      throw new Error(error.message);

    }

  }

  async cadastrar(produto) {
    try {

      const nomeNormalizado = utils.normalizaString(produto.nome).toLowerCase();

      const produtoExistente = await this.prisma.produto.findFirst({
        where: {
          AND: [
            { nome: { equals: nomeNormalizado } },
            { categoria_id: { equals: produto.categoria_id } },
          ],
        },
      });

      if (produtoExistente) {
        throw new Error('Já existe um produto com este nome nesta categoria');
      }

      const categoria = await this.prisma.categoria.findFirst({
        where: { id: produto.categoria_id },
      });

      if (!categoria) throw new Error('Categoria não encontrada.');

      const novoProduto = await this.prisma.produto.create({
        data: {
          nome: nomeNormalizado,
          descricao: produto.descricao,
          categoria_id: produto.categoria_id,
        },
      });

      await this.prisma.categoria.update({
        where: { id: produto.categoria_id },
        data: {
          produtos: {
            connect: {
              id: novoProduto.id,
            },
          },
        },
      });

      return novoProduto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editar(id, produto) {
    try {
      if (!id) throw new Error('ID inválido.');

      const produtoAntigo = await this.prisma.produto.findUnique({ where: { id } });
      
      if (!produtoAntigo) throw new Error(`Produto com o ID ${id} não encontrado.`);

      produto.nome = produto.nome || produtoAntigo.nome;
      produto.descricao = produto.descricao || produtoAntigo.descricao;
      produto.categoria_id = produto.categoria_id || produtoAntigo.categoria_id;

      const nomeNormalizado = utils.normalizaString(produto.nome).toLowerCase();

      if (
        nomeNormalizado === produtoAntigo.nome &&
        produto.categoria_id === produtoAntigo.categoria_id &&
        produto.descricao === produtoAntigo.descricao
      ) {
        return produtoAntigo;
      }

      const produtoExistente = await this.prisma.produto.findFirst({
        where: {
          AND: [
            { nome: { equals: nomeNormalizado } },
            { categoria_id: { equals: produto.categoria_id } }
          ],
        },
      });

      if (produtoExistente) {
        console.log(produtoExistente.id);
        console.log(id)
        if (produtoExistente.id != id) throw new Error('Já existe um produto com este nome nesta categoria');
      }

      const categoria = await this.prisma.categoria.findUnique({ where: { id: produto.categoria_id } });
      if (!categoria) throw new Error('Categoria não encontrada.');

      const produtoAtualizado = await this.prisma.produto.update({
        where: { id },
        data: {
          nome: nomeNormalizado,
          descricao: produto.descricao,
          categoria_id: produto.categoria_id,
        },
      });

      return produtoAtualizado;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async excluir(id) {
    try {
      const produto = await this.prisma.produto.findFirst({
        where: { id },
      });

      if (!produto) {
        throw new ProdutoNaoEncontradoError();
      }

      await this.prisma.produto.delete({ where: { id } });

      return { message: 'Produto excluído com sucesso.' };
    } catch (error) {
      if (error.code === 'P2003') {
        throw new Error('Erro ao excluir produto: Produto não encontrado.');
      } else {
        throw new Error('Erro ao excluir produto: ' + error.message);
      }
    }
  }
}

module.exports = ProdutoService;
