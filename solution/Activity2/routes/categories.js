const express = require('express');
const router = express.Router();


const {
    getSingleCategory
  } = require('../controllers/categories');

  router
    .route('/:id')
    .get( getSingleCategory);
  
  module.exports = router;
