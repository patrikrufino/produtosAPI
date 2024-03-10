import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'schema.graphql', // Caminho para o schema GraphQL
  endpoint: 'http://localhost:4466', // URL da API do Prisma
});

class Produto {
  constructor(id, nome, descricao, categoria) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
  }

  async Cadastrar() {
    const nomeMinusculo = this.nome.toLowerCase();
    const categoriaId = this.categoria.id;

    // Verifica se já existe um produto com o mesmo nome na mesma categoria
    const produtoExistente = await prisma.produto.findOne({
      where: {
        AND: [
          { nome: { equals: nomeMinusculo } },
          { categoria_id: { equals: categoriaId } },
        ],
      },
    });

    if (produtoExistente) {
      throw new Error('Já existe um produto com o mesmo nome nesta categoria.');
    }

    // Cria o novo produto no banco de dados
    await prisma.produto.create({
      data: {
        nome: this.nome,
        descricao: this.descricao,
        categoria_id: this.categoria.id,
      },
    });

    console.log(`Produto "${this.nome}" cadastrado com sucesso!`);
  }

  async Editar() {
    const nomeMinusculo = this.nome.toLowerCase();
    const categoriaId = this.categoria.id;

    // Verifica se o nome do produto foi alterado
    const produtoOriginal = await prisma.produto.findOne({
      where: { id: this.id },
    });

    const nomeOriginalMinusculo = produtoOriginal.nome.toLowerCase();

    if (nomeMinusculo !== nomeOriginalMinusculo) {
      // Verifica se já existe um produto com o novo nome na mesma categoria
      const produtoExistente = await prisma.produto.findOne({
        where: {
          AND: [
            { nome: { equals: nomeMinusculo } },
            { categoria_id: { equals: categoriaId } },
          ],
        },
      });

      if (produtoExistente) {
        throw new Error('Já existe um produto com o mesmo nome nesta categoria.');
      }
    }

    // Atualiza o produto no banco de dados
    await prisma.produto.update({
      where: { id: this.id },
      data: {
        nome: this.nome,
        descricao: this.descricao,
        categoria_id: this.categoria.id,
      },
    });

    console.log(`Produto "${this.nome}" atualizado com sucesso!`);
  }

  async Excluir() {
    await prisma.produto.delete({ where: { id: this.id } });
    console.log(`Produto "${this.nome}" excluído com sucesso!`);
  }

  async Listar() {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true, // Inclui a categoria associada ao produto
      },
    });
    console.log("Listando todos os produtos:");
    produtos.forEach((produto) => console.log(produto.nome));
  }

  async buscarPorId() {
    const produto = await prisma.produto.findOne({
      where: { id: this.id },
      include: {
        categoria: true, // Inclui a categoria associada ao produto
      },
    });

    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    console.log(`Produto "${produto.nome}" encontrado:`);
    console.log(produto);
  }
}

export default Produto;
