const { PrismaClient } = require("@prisma/client");
const StringUtils = require("../utils/StringUtils");
const utils = new StringUtils();

class CategoriaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async listar() {
    const categorias = await this.prisma.categoria.findMany();
    return categorias;
  }

  async cadastrar(categoria) {
    const nomeNormalizado = utils.removerAcentos(categoria.nome).toLowerCase();
  
    // Validação para evitar categorias duplicadas
    const categoriaExistente = await this.prisma.categoria.findFirst({
      where: { nome: { equals: nomeNormalizado } },
    });
  
    if (categoriaExistente) {
      throw new Error('Já existe uma categoria com este nome.');
    }
  
    await this.prisma.categoria.create({
      data: {
        nome: categoria.nome,
      },
    });
  }

  async editar(id, categoria) {
    const nomeNormalizado = utils.removerAcentos(categoria.nome).toLowerCase();

    // Validação para evitar categorias duplicadas
    const categoriaExistente = await this.prisma.categoria.findFirst({
      where: {
        AND: [
          { id: { not: { equals: id } } },
          { nome: { equals: nomeNormalizado } },
        ],
      },
    });

    if (categoriaExistente) {
      throw new Error('Já existe uma categoria com este nome.');
    }

    await this.prisma.categoria.update({
      where: { id },
      data: {
        nome: categoria.nome,
      },
    });
  }

  async excluir(id) {
    await this.prisma.categoria.delete({ where: { id } });
  }
}

module.exports = CategoriaService;
