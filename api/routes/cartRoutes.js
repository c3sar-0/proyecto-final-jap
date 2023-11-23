const express = require("express");

const cartRouter = express.Router();
// Importamos los controllers necesarios
const cartController = require("../controllers/cartController");

cartRouter.post("/", cartController.addToCart);

cartRouter.get("/", cartController.getCart);

cartRouter.put("/:id", cartController.updateCart);

cartRouter.delete("/:id", cartController.deleteCartProduct);

module.exports = cartRouter;
