const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const listar = async () => {
  const categorias = await prisma.categoria.findMany();
  return categorias;
};

async function cadastrar (categoria) {
  const nomeMinusculo = categoria.nome.toLowerCase();
  // Validação para evitar categorias duplicadas

  const categoriaExistente = await prisma.categoria.findFirst({
    where: { nome: { equals: nomeMinusculo } },
  });

  if (categoriaExistente) {
    throw new Error('Já existe uma categoria com este nome.');
  }

  await prisma.categoria.create({
    data: {
      nome: categoria.nome,
    },
  });
};

const editar = async (id, categoria) => {
  const nomeMinusculo = categoria.nome.toLowerCase();

  // Validação para evitar categorias duplicadas

  const categoriaExistente = await prisma.categoria.findFirst({
    where: {
      AND: [
        { id: { not: { equals: id } } },
        { nome: { equals: nomeMinusculo } },
      ],
    },
  });

  if (categoriaExistente) {
    throw new Error('Já existe uma categoria com este nome.');
  }

  await prisma.categoria.update({
    where: { id },
    data: {
      nome: categoria.nome,
    },
  });
};

const excluir = async (id) => {
  await prisma.categoria.delete({ where: { id } });
};

module.exports = { listar, cadastrar, editar, excluir };
