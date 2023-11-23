const cats = require("../json/cats/cat.json");

const getCategories = async () => {
  try {
    const categories = cats;
    return categories;
  } catch (err) {
    console.log(err);
  }

  return false;
};

const getCategoryById = async () => {
  const catBuscada = cats.find((cat) => cat.id === parseInt(req.params.id));

  if (catBuscada !== undefined) {
    res.status(200).json(catBuscada);
  } else {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};
