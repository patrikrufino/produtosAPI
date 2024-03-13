const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

// Aceita URLENCODED
app.use(bodyParser.urlencoded({ extended: true }));

// Importa as rotas da API
const apiRoutes = require('./api-routes/index');

// Define as rotas da API
app.use('/api', apiRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
