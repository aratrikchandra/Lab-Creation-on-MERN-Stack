const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    return res.status(200).json({ message: "Create Todo endpoint hit successfully. Add your code here!" });
};

module.exports = {
  createTodo
};
