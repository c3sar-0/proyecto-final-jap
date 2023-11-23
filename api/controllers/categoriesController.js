// Importamos los models necesarios
const categoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
  const categories = await categoriesModel.getCategories();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(500).json({ message: "Server failed" });
  }
};

const getCategoryById = async (req, res) => {
  const category = categoriesModel.getCategories(req.params.id);
  res.status(200).json(category);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};
