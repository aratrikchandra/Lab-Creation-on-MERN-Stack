const express = require('express');
const router = express.Router();


const {
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
  } = require('../controllers/categories');

  router.route('/').post( createCategory);
  router
    .route('/:id')
    .get( getSingleCategory)
    .patch( updateCategory)
    .delete( deleteCategory);
  
  module.exports = router;
