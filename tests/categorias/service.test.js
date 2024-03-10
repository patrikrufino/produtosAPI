const { PrismaClient } = require("@prisma/client");
const { validate } = require('@hapi/joi');

const prisma = new PrismaClient();

const categoriaService = require('../../services/CategoriaService');
const CategoriaService = new categoriaService;

describe('Categoria Service', () => {
  describe('listarCategorias', () => {
    it('deve retornar uma lista de categorais', async () => {
      const categorias = await CategoriaService.listar();
      expect(categorias).toBeInstanceOf(Array);
    })
  });
});
