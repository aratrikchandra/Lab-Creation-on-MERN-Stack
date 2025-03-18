const Category = require('../models/Category');
const Todo = require('../models/Todo');

const createCategory = async (req, res) => {
  try {
    const { todo_id: todoId } = req.body;
    const { _id: userID } = req.user;
    const isValidTodo = await Todo.findOne({ _id: todoId, user_id: userID });

    if (!isValidTodo) {
      return res.status(404).json({ error: `No todo found with id: ${todoId}` });
    }

    const category = await Category.create(req.body);
    return res.status(201).json({ category });
  } catch (error) {
    return res.status(400).json({ error: 'Bad Request', details: error.message });
  }
};



module.exports = {
  createCategory
};