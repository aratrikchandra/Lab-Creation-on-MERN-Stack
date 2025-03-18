const Todo = require('../models/Todo');
const Category = require('../models/Category');

const deleteTodo = async (req, res) => {
  try {
    const {
      user: { _id: userId  },
      params: { id: todoId },
    } = req;

    // Find and delete the Todo
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      user_id: userId,
    });

    if (!todo) {
      return res.status(404).json({ error: `No todo with id ${todoId}` });
    }

    // Delete all related categories
    await Category.deleteMany({ todo_id: todoId });

    return res.status(200).send({ message: 'Todo and related categories deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  deleteTodo
};