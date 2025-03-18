const Category = require('../models/Category');
const Todo = require('../models/Todo');

const deleteCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { _id: userID } = req.user;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: `No category with id ${categoryId}` });
    }

    const { todo_id: todoId } = category;
    const isValidTodo = await Todo.findOne({ _id: todoId, user_id: userID });
    if (!isValidTodo) {
      return res.status(404).json({ error: `No category with id ${categoryId}` });
    }

    await Category.findOneAndDelete({ _id: categoryId });
    return res.status(200).json({ msg: 'Success! Category removed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


module.exports = {
  deleteCategory
};