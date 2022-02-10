const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

function productFile() {
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if (err) {
      console.log(`Não foi possível adicionar o produto ${product.name} \n ${err}`);
    } else {
      console.log(`Produto ${product.name} adicionado com sucesso`)
    }
  });
}

const app = express();

app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
  if(err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

// Post -> Inserir um dado
// Get -> Buscar um dado
// Put -> Alterar um dado
// Delete -> Deletar um dado

// Body -> Sempre que quiser enviar dados para o servidor
// Params -> /product/12123
// Query -> /product?id=1123&name=fone

app.post('/products', (request, response) => {
  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product);

  productFile();

  return response.json(product);
});

app.get('/products', (request, response) => {
  return response.json(products);
});

app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});

app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  productFile();

  return response.json({ message: "Produto atualizado com sucesso" });
});

app.delete('/products/:id', (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ message: "Produto removido com sucesso" });
});

app.listen(4002, () => console.log('Servidor esta rodando na porta 4002'));
