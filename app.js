const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const products = [];
let id = 1;

function findProductIndexById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) return i;
  }
  return -1;
}

app.get("/api/products", function (_, res) {
  res.send(products);
});

app.post("/api/products", function (req, res) {
  if (!req.body) return res.sendStatus(404);
  const productName = req.body.name;
  const productQuantity = req.body.quantity;
  const product = { name: productName, quantity: productQuantity };
  product.id = id++;
  products.push(product);
  res.send(product);
});

app.delete("/api/products/:id", function (req, res) {
  const id = req.params.id;
  const index = findProductIndexById(id);
  if (index > -1) {
    const product = products.splice(index, 1)[0];
    res.send(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.listen(port, () => {
  console.log(`Приложение запущено на http://localhost:${port}`);
});
