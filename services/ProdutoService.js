const { PrismaClient } = require("@prisma/client");

class ProdutoService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async listar() {
    const produtos = await this.prisma.produto.findMany();
    return produtos;
  }

  async listarPorId(id) {
    const produto = await this.prisma.produto.findFirst({
      where: { id },
    });
    return produto;
  }

  async cadastrar(produto) {
    const nomeMinusculo = produto.nome.toLowerCase();

    // Validação para evitar produtos duplicados
    const produtoExistente = await this.prisma.produto.findFirst({
      where: { nome: { equals: nomeMinusculo } },
    });

    if (produtoExistente) {
      const mesmaCategoria = produtoExistente.categoria_id === produto.categoria_id;

      if (mesmaCategoria) {
        throw new Error('Já existe um produto com este nome nesta categoria');
      }
  
    }

    // Verificar se a categoria existe

    const categoria = await this.prisma.categoria.findFirst({
      where: { id: produto.categoria_id },
    });

  
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    // Criar o produto

    const novoProduto = await this.prisma.produto.create({
      data: {
        nome: produto.nome.toLowerCase(),
        descricao: produto.descricao,
        categoria_id: produto.categoria_id,
      },
    });

    // Atualizar a categoria

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
  }

  async editar(id, produto) {
    const nomeMinusculo = produto.nome.toLowerCase();
    
    // Validação para evitar produtos duplicados
    
    const produtoExistente = await this.prisma.produto.findFirst({
      where: { nome: { equals: nomeMinusculo } },
    });
    
    console.log(produtoExistente)
    if (produtoExistente) {
      const mesmaCategoria = produtoExistente.categoria_id === produto.categoria_id;

      if (mesmaCategoria) {
        throw new Error('Já existe um produto com este nome nesta categoria');
      }
  
    }

    const categoria = await this.prisma.categoria.findFirst({
      where: { id: produto.categoria_id },
    });

    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    await this.prisma.produto.update({
      where: { id },
      data: {
        nome: produto.nome.toLowerCase(),
        descricao: produto.descricao,
        categoria_id: produto.categoria_id,
      },
    });
  }

  async excluir(id) {
    await this.prisma.produto.delete({ where: { id } });
  }
}

module.exports = ProdutoService;
