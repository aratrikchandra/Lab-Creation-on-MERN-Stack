const Todo = require('../models/Todo');

const updateTodo = async (req, res) => {
  try {
    const {
      user: { _id: userId  },
      params: { id: todoId },
    } = req;

    const todo = await Todo.findByIdAndUpdate(
      { _id: todoId, user_id: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: `No todo with id ${todoId}` });
    }

    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(400).json({ error: 'Bad Request', details: error.message });
  }
};


module.exports = {
  updateTodo
};