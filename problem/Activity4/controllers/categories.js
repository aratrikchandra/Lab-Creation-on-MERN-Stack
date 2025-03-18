const Category = require('../models/Category');
const Todo = require('../models/Todo');

const deleteCategory = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Delete Category endpoint hit successfully. Add your code here!" });
};

module.exports = {
  deleteCategory
};
