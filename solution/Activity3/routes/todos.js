const express = require('express')
const router = express.Router()
const {
  updateTodo
} = require('../controllers/todos')

router.route('/:id').patch( updateTodo)

module.exports = router
