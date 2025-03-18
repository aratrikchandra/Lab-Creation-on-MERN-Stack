const Todo = require('../models/Todo');
const Category = require('../models/Category');

const deleteTodo = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Delete Todo endpoint hit successfully. Add your code here!" });
};

module.exports = {
  deleteTodo
};
