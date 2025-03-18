const Category = require('../models/Category');
const Todo = require('../models/Todo');

const getSingleCategory = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Get Single Category endpoint hit successfully. Add your code here!" });
};

const getSingleTodoCategories = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Get Single Todo Categories endpoint hit successfully. Add your code here!" });
};

module.exports = {
  getSingleCategory,
  getSingleTodoCategories
};
