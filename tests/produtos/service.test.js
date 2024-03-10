const { PrismaClient } = require("@prisma/client");
const { validate } = require('@hapi/joi');

const prisma = new PrismaClient();

const produtoService = require('../../services/ProdutoService');
const ProdutoService = new produtoService;

describe('Produto Service', () => {
  describe('listarProdutos', () => {
    it('deve retornar uma lista de produtos', async () => {
      const produtos = await ProdutoService.listar();
      expect(produtos).toBeInstanceOf(Array);
    });
  });

//   describe('cadastrarProduto', () => {
//     it('deve cadastrar um novo produto', async () => {
//       const produto = {
//         nome: 'Produto Teste',
//         descricao: 'Descrição do produto teste',
//         categoria_id: 1,
//       };

//       const schema = Joi.object({
//         nome: Joi.string().required(),
//         descricao: Joi.string().allow(''),
//         categoria_id: Joi.number().required(),
//       });

//       const { error } = validate(produto, schema);
//       if (error) {
//         throw new Error(error.details[0].message);
//       }

//       await service.cadastrarProduto(produto);

//       const produtoCadastrado = await prisma.produto.findFirst({
//         where: { nome: 'Produto Teste' },
//       });

//       expect(produtoCadastrado).toBeTruthy();
//     });

//     it('deve lançar um erro se o nome do produto já existir', async () => {
//       const produto = {
//         nome: 'Produto Teste',
//         descricao: 'Descrição do produto teste',
//         categoria_id: 1,
//       };

//       await service.cadastrarProduto(produto);

//       await expect(service.cadastrarProduto(produto)).rejects.toThrowError('Já existe um produto com este nome.');
//     });
//   });
});
