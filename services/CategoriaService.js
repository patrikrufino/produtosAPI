const { PrismaClient } = require("@prisma/client");
const StringUtils = require("../utils/StringUtils");
const utils = new StringUtils();

class CategoriaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async listar() {
    try {
      const categorias = await this.prisma.categoria.findMany();
      return categorias;
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao listar categorias.' };
    }
  }

  async cadastrar(categoria) {
    try {
      const nomeNormalizado = utils.removerAcentos(categoria.nome).toLowerCase();

      const categoriaExistente = await this.prisma.categoria.findFirst({
        where: { nome: { equals: nomeNormalizado } },
      });

      if (categoriaExistente) {
        throw new Error('Já existe uma categoria com este nome.');
      }

      const novaCategoria = await this.prisma.categoria.create({
        data: {
          nome: nomeNormalizado,
        },
      });

      return novaCategoria;
    } catch (error) {
      throw new Error('Erro ao cadastrar categoria: ' + error.message);
    }
  }

  async editar(id, categoria) {
    try {
      const nomeNormalizado = utils.removerAcentos(categoria.nome).toLowerCase();
  
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
          nome: nomeNormalizado,
        },
      });
  
      const categoriaAtualizada = await this.prisma.categoria.findUnique({
        where: { id },
      });
  
      return categoriaAtualizada;
    } catch (error) {
      throw new Error('Erro ao editar categoria: ' + error.message);
    }
  }  

  async excluir(id) {
    try {
      await this.prisma.categoria.delete({ where: { id } });
      return { message: 'Categoria excluída com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao excluir categoria: ' + error.message);
    }
  }
}

module.exports = CategoriaService;
