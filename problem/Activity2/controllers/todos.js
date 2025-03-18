const Todo = require('../models/Todo');

const getAllTodosOfUser = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Get All Todos Of User endpoint hit successfully. Add your code here!" });
};

const getTodo = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Get Todo endpoint hit successfully. Add your code here!" });
};

module.exports = {
  getAllTodosOfUser,
  getTodo
};
