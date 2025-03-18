const Todo = require('../models/Todo');

const getAllTodosOfUser = async (req, res) => {
  try {
    const todos = await Todo.find({ user_id: req.user._id }).sort('created_at');
    return res.status(200).json({ todos, count: todos.length });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      params: { id: todoId },
    } = req;

    const todo = await Todo.findOne({
      _id: todoId,
      user_id: userId,
    });

    if (!todo) {
      return res.status(404).json({ error: `No todo with id ${todoId}` });
    }

    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


module.exports = {
  getAllTodosOfUser,
  getTodo
};