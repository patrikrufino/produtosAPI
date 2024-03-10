const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const listar = async () => {
  const produtos = await prisma.produto.findMany();
  return produtos;
};

async function listarPorId(id) {

  const produto = await prisma.produto.findFirst({
    where: {
      id: {
        equals: id
      }
    }
  })

  return produto;
}

const cadastrar = async (produto) => {
  // Validação para evitar produtos duplicados

  const nomeMinusculo = produto.nome.toLowerCase();
  const produtoExistente = await prisma.produto.findFirst({
    where: { nome: { equals: nomeMinusculo }, },
  });

  if (produtoExistente) {
    const mesmaCategoria = produtoExistente.categoria_id === produto.categoria_id;

    if (mesmaCategoria) {
      throw new Error('Já existe um produto com este nome nesta categoria');
    }
  }

  // Verificar se a categoria existe

  const categoria = await prisma.categoria.findFirst({
    where: { id: produto.categoria_id },
  });

  if (!categoria) {
    throw new Error('Categoria não encontrada.');
  }

  // Criar o produto

  const novoProduto = await prisma.produto.create({
    data: {
      nome: produto.nome.toLowerCase(),
      descricao: produto.descricao,
      categoria_id: produto.categoria_id,
    },
  });

  // Atualizar a categoria

  await prisma.categoria.update({
    where: { id: produto.categoria_id },
    data: {
      produtos: {
        connect: {
          id: novoProduto.id,
        },
      },
    },
  });
};

const editar = async (id, produto) => {
  const nomeMinusculo = produto.nome.toLowerCase();

  // Validação para evitar produtos duplicados

  const produtoExistente = await prisma.produto.findFirst({
    where: {
      AND: [
        { id: { not: { equals: id } } },
        { nome: { equals: nomeMinusculo } },
      ],
    },
  });

  if (produtoExistente) {
    throw new Error('Já existe um produto com este nome.');
  }

  await prisma.produto.update({
    where: { id },
    data: {
      nome: produto.nome,
      descricao: produto.descricao,
      categoria_id: produto.categoria_id,
    },
  });
};

const excluir = async (id) => {
  await prisma.produto.delete({ where: { id } });
};

module.exports = { listar, listarPorId, cadastrar, editar, excluir };
