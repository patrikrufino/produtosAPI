## Projeto: produtosAPI

**Introdução:**

Este projeto demonstra como utilizar o Docker Compose para subir containers Node.js e Prisma em conjunto para um ambiente de desenvolvimento completo para a API de produtos orientado a objetos.

**Requisitos:**

* Docker instalado e configurado
* Node.js instalado (Nesse projeto estou utilizando a versão 21.7.1)
* npm instalado

**Como usar:**

1. Clone o projeto para sua máquina:

```
git clone https://github.com/patrik.rufino/produtosAPI.git
```

2. Acesse a pasta do projeto:

```
cd produtosAPI
```

3. Instale as dependências do Node.js:

```
npm install
```

4. Edite o arquivo `docker-compose.yml` se necessário (por exemplo, portas, volumes).
5. Suba os containers:

```
docker-compose up
```

6. Aguarde a inicialização dos containers (pode levar alguns segundos).
7. Acesse o serviço Node.js na URL configurada no `docker-compose.yml` (geralmente localhost:3000).

**Observações:**

* O container Prisma é configurado para usar o banco de dados Postgress atravas de uma imagem do docker.
* O container Node.js usa o Prisma Client para se conectar ao banco de dados.
* Existe um script para rodar em modo de desenvolvimento

8. Rode os comandos do PRISMA

```
npx prisma validade
```

```
npx prisma generate
```

```
npx prisma migrate dev
```

9. Rode o script

````
npm run dev
````

* Não foi pensado para produção

**Recursos:**

* Documentação do Docker Compose: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
* Documentação do Prisma: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
* Documentação do Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)

**Contribuições:**

Sinta-se à vontade para contribuir com este projeto abrindo issues ou pull requests.

**Licença:**

Este projeto está licenciado sob a licença MIT.

# Exemplo de uso da API de produtos:

Após subir os containers, você pode usar a API do Node.js para realizar operações no banco de dados de produtos. Por exemplo, para listar todos os produtos:

As rotas estão divididas em duas classes:

- **api-routes/CategoriaRouter.js**
- **api-routes/ProdutoRouter.js**

## Produtos

### Todos os produtos:

```bash
curl http://localhost:3000/api/produtos
```

### Produto especifico:

```bash
curl http://localhost:3000/api/produtos/1
```

## Categorias

### Todas as categorias:

```bash
curl http://localhost:3000/api/categorias
```

