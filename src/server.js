const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const category = require("./data/categories.json");
const products = require("./data/products.json");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [{ username: "admin", password: "password123" }];

app.get("/login", (req, res) => {
  res.send("Сервер работает!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    const token = "jld6lv9fbW8";
    res.json({ token });
  } else {
    res.status(401).send("Логин или пароль не верны. Введите еще раз");
  }
});

app.get("/products/table", function (request, response) {
  response.json(products);
});

app.get("/products/preview", function (request, response) {
  response.json(products);
});

app.get("/products/preview/:productId", function (req, res) {
  const productId = req.params.productId;
  const product = findProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Продукт не знайдено");
  }
});

function findProductById(productId) {
  for (const category in products) {
    const productsInCategory = products[category];
    const product = productsInCategory.find((p) => p.id === productId);
    if (product) {
      return product;
    }
  }
  return null;
}

app.delete("/products/delete/:productId", function (req, res) {
  const productId = req.params.productId;
  const productIndex = findProductIndexById(productId);

  if (productIndex !== -1) {
    products[productIndex.category].splice(productIndex.index, 1);

    res.json({ message: "Продукт було успішно видалено" });
  } else {
    res.status(404).send("Продукт не знайдено");
  }
});

function findProductIndexById(productId) {
  for (const category in products) {
    const productsInCategory = products[category];
    for (let index = 0; index < productsInCategory.length; index++) {
      if (productsInCategory[index].id === productId) {
        return { category, index };
      }
    }
  }
  return -1;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
