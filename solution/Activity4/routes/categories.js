const express = require('express');
const router = express.Router();


const {
    deleteCategory
  } = require('../controllers/categories');

  router
    .route('/:id')
    .delete( deleteCategory);
  
  module.exports = router;
