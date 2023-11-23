// Importamos los models necesarios
const peopleModel = require("../models/cartModel");

const getUsers = async (req, res) => {
  const users = await peopleModel.getUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  
};

const createUser = async (req, res) => {
  
};

const updateUser = async (req, res) => {
  
};

const deleteUser = async (req, res) => {
  
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
