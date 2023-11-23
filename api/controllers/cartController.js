// Importamos los models necesarios
const peopleModel = require("../models/cartModel");

const getCart = async (req, res) => {
  const cart = await cartModel.getCart(req.params.id);
  if (cart) {
    res.status(201).json(cart);
  } else {
    res.status(500).json({ message: "Server failed" });
  }
};

const addToCart = async (req, res) => {
  const product = await cartModel.addToCart(req.body);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(500).json({ message: "Server failed" });
  }
};

const updateCart = async (req, res) => {
  const response = await cartModel.updateCart(req.body.count, req.params.id);
  if (response) {
    res.status(201).json({ message: "valor modificado" });
  } else {
    res.status(500).json({ message: "Server failed" });
  }
};

const deleteCartProduct = async (req, res) => {
  const response = await cartModel.deleteCartProduct(req.params.id);
  if (response) {
    res.status(204).json({ message: "Elemento eliminado correctamente" });
  } else {
    res.status(500).json({ message: "Server failed" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCartProduct,
};
