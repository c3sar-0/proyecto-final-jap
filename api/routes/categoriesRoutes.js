const express = require("express");
// Importamos los controllers necesarios
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getCategories);

categoriesRouter.get("/:id", categoriesController.getCategoryById);

module.exports = categoriesRouter;
