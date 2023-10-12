const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const categories = require("./data/categories.json");
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
    const token = "jld6lv'9fbW8";
    res.json({ token });
  } else {
    res.status(401).send("Логин или пароль не верны. Введите еще раз");
  }
});

app.get("/api/products/table", function (request, response) {
  response.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
