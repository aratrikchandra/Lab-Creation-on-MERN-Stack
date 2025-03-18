const express = require('express');
const router = express.Router();


const {
    updateCategory
  } = require('../controllers/categories');

  router
    .route('/:id')
    .patch( updateCategory);
    
  module.exports = router;
