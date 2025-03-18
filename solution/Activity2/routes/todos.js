const express = require('express')
const router = express.Router()
const {
  getTodo,
  getAllTodosOfUser
} = require('../controllers/todos')

const { getSingleTodoCategories } = require('../controllers/categories')
router.route('/').get( getAllTodosOfUser)
router.route('/:id').get( getTodo);
router.route('/:id/categories').get( getSingleTodoCategories);
module.exports = router
