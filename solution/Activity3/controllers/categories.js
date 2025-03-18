const Category = require('../models/Category');
const Todo = require('../models/Todo');


const updateCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { category_name, color_code } = req.body;
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

    const updatePayload = {};
    if (category_name) updatePayload.category_name = category_name;
    if (color_code) updatePayload.color_code = color_code;

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ updatedCategory });
  } catch (error) {
    return res.status(400).json({ error: 'Bad Request', details: error.message });
  }
};


module.exports = {
  updateCategory
};