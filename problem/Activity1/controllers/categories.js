const Category = require('../models/Category');
const Todo = require('../models/Todo');

const createCategory = async (req, res) => {
    return res.status(200).json({ message: "Create Category endpoint hit successfully. Add your code here!" });
};

module.exports = {
  createCategory
};
