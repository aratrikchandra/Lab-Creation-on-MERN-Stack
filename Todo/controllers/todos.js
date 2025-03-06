const Todo = require('../models/Todo')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ todos, count: todos.length })
}
const getTodo = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req

  const todo = await Todo.findOne({
    _id: todoId,
    createdBy: userId,
  })
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
}

const createTodo = async (req, res) => {
  req.body.createdBy = req.user.userId
  const todo = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ todo })
}

const updateTodo = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: todoId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const todo = await Todo.findByIdAndUpdate(
    { _id: todoId, createdBy: userId },
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
    createdBy: userId,
  })
  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  getTodo,
}
