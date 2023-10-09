const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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
    res.status(401).json({ message: "Логин или пароль не верны" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
