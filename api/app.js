const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
let cart = require("./json/cart/buy.json");
let cats = require("./json/cats/cat.json");
let sell = require("./json/sell/publish.json");
let userCart = require("./json/user_cart/25801.json");
const jwt = require("jsonwebtoken");
const secret_key = "clave secreta";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "siempreperreo",
  database: "CRUD",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({ origin: "*" }));

//Se crea el token en caso de haber introducido correctamente el usuario y contraseña
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, secret_key);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecta" });
  }
});

//Hacemos una validación del token
app.use("/user_cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], secret_key);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/cart", async (req, res) => {
  res.json(cart);
});

app.get("/cats", async (req, res) => {
  res.json(cats);
});

app.get("/cats/:id", async (req, res) => {
  const catBuscada = cats.find((cat) => cat.id === parseInt(req.params.id));

  if (catBuscada !== undefined) {
    res.json(catBuscada);
  } else {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
});

app.get("/cats_products/:id", async (req, res) => {
  try {
    const catProductos = await require(`./json/cats_products/${parseInt(
      req.params.id
    )}.json`);
    res.json(catProductos);
  } catch (error) {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const producto = await require(`./json/products/${parseInt(
      req.params.id
    )}.json`);
    res.json(producto);
  } catch (error) {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.get("/products_comments/:id", async (req, res) => {
  try {
    const comentarioProducto =
      await require(`./json/products_comments/${parseInt(req.params.id)}.json`);
    res.json(comentarioProducto);
  } catch (error) {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

app.get("/sell", async (req, res) => {
  res.json(sell);
});

app.get("/user_cart", async (req, res) => {
  res.json(userCart);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
