const express = require('express')
const router = express.Router()
const {
  createTodo,
  getTodo,
  getAllTodosOfUser,
  updateTodo,
  deleteTodo
} = require('../controllers/todos')

const { getSingleTodoCategories } = require('../controllers/categories')
router.route('/').post( createTodo).get( getAllTodosOfUser)
router.route('/:id').get( getTodo).delete( deleteTodo).patch( updateTodo)
router.route('/:id/categories').get( getSingleTodoCategories);
module.exports = router
