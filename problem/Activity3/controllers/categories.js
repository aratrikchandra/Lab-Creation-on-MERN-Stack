const Category = require('../models/Category');
const Todo = require('../models/Todo');

const updateCategory = async (req, res) => {
  // Dummy response for now
  return res.status(200).json({ message: "Update Category endpoint hit successfully. Add your code here!" });
};

module.exports = {
  updateCategory
};
