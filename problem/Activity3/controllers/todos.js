const Todo = require('../models/Todo');

const updateTodo = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Update Todo endpoint hit successfully. Add your code here!" });
};

module.exports = {
  updateTodo
};
