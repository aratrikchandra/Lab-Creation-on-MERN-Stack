const Category = require('../models/Category');
const Todo = require('../models/Todo');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createCategory = async (req, res) => {
  const { todo_id: todoId } = req.body;
  const { userID } = req.user;
  const isValidTodo = await Todo.findOne({ _id: todoId , user_id: userID });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No todo found with id : ${todoId}`);
  }

  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};
// const getAllCategory = async (req, res) => {
//   const categories = await Category.find({});

//   res.status(StatusCodes.OK).json({ categories, count: categories.length });
// };
const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { userID } = req.user;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  const { todo_id: todoId } = category;

  const isValidTodo = await Todo.findOne({ _id: todoId , user_id: userID });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};
const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { category_name, color_code } = req.body;
  const { userID } = req.user;
  if (!category_name) {
    throw new CustomError.BadRequestError('Please provide Category name');
  }
  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  const { todo_id: todoId } = category;

  const isValidTodo = await Todo.findOne({ _id: todoId , user_id: userID });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  category.category_name = category_name;

  if(color_code){
    category.color_code = color_code;
  }

  await category.save();
  res.status(StatusCodes.OK).json({ category });
};
const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { userID } = req.user;
  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  const { todo_id: todoId } = category;

  const isValidTodo = await Todo.findOne({ _id: todoId , user_id: userID });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  await category.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! category removed' });
};

const getSingleTodoCategories = async (req, res) => {
  const { id: todoId } = req.params;
  const { userID } = req.user;
  const isValidTodo = await Todo.findOne({ _id: todoId , user_id: userID });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No todo found with id : ${todoId}`);
  }
  const categories = await Category.find({ todo: todoId });
  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};


module.exports = {
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getSingleTodoCategories
  };