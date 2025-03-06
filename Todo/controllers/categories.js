const Category = require('../models/Category');
const Todo = require('../models/Todo');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createCategory = async (req, res) => {
  const { todo: todoId } = req.body;

  const isValidTodo = await Todo.findOne({ _id: todoId });

  if (!isValidTodo) {
    throw new CustomError.NotFoundError(`No category with id : ${todoId}`);
  }

  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};
const getAllCategory = async (req, res) => {
  const categories = await Category.find({});

  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};
const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  res.status(StatusCodes.OK).json({ category });
};
const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { startAt, startDate, endDate , price} = req.body;
  if (!startAt || !startDate || !endDate || !price) {
    throw new CustomError.BadRequestError('Please provide all values : startAt, startDate, endDate, price');
  }
  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  category.endDate = endDate;
  category.startDate = startDate;
  category.startAt = startAt;
  category.price = price;

  await category.save();
  res.status(StatusCodes.OK).json({ category });
};
const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new CustomError.NotFoundError(`No category with id ${categoryId}`);
  }

  await category.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! category removed' });
};

const getSingleTodoCategories = async (req, res) => {
  const { id: todoId } = req.params;
  const categories = await Category.find({ todo: todoId });
  res.status(StatusCodes.OK).json({ categories, count: categories.length });
};




module.exports = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getSingleTodoCategories
  };