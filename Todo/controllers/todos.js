const Todo = require('../models/Todo')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// const getAllTodos = async (req, res) => {
//   const todos = await Todo.find({});
//   res.status(StatusCodes.OK).json({ todos, count: todos.length });
// };

const getAllTodosOfUser = async (req, res) => {
  const todos = await Todo.find({ user_id: req.user.userId }).sort('created_at')
  res.status(StatusCodes.OK).json({ todos, count: todos.length })
}
const getTodo = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req

  const todo = await Todo.findOne({
    _id: todoId,
    user_id: userId,
  })
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
}

const createTodo = async (req, res) => {
  req.body.user_id = req.user.userId
  // console.log(req.body)
  const todo = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ todo })
}

const updateTodo = async (req, res) => {
  const {
    body: { title, due_date },
    user: { userId },
    params: { id: todoId },
  } = req

  if (title === '' || due_date === '') {
    throw new BadRequestError('Title or Due Date fields cannot be empty')
  }
  const todo = await Todo.findByIdAndUpdate(
    { _id: todoId, user_id: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
}

const deleteTodo = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req

  const todo = await Todo.findByIdAndRemove({
    _id: todoId,
    user_id: userId,
  })
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createTodo,
  deleteTodo,
  getAllTodosOfUser,
  updateTodo,
  getTodo,
}
