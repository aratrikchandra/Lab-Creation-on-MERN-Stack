const express = require('express')
const router = express.Router()
const {
  deleteTodo
} = require('../controllers/todos')

router.route('/:id').delete( deleteTodo);
module.exports = router
