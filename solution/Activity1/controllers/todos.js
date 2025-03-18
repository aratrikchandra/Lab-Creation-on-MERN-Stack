const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const todo = await Todo.create(req.body);
    return res.status(201).json({ todo });
  } catch (error) {
    return res.status(400).json({ error: 'Bad Request', details: error.message });
  }
};

module.exports = {
  createTodo
};