const express = require('express');

const app = express();

const products = [];

// Post -> Inserir um dado
// Get -> Buscar um dado
// Put -> Alterar um dado
// Delete -> Deletar um dado

// Body -> Sempre que quiser enviar dados para o servidor
// Params -> /product/12123
// Query -> /product?id=1123&name=fone

app.post('/products', (request, response) => {

})

app.listen(4002, () => console.log('Servidor esta rodando na porta 4002'));
