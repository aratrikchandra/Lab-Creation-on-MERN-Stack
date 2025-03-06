const express = require('express');
const router = express.Router();
const { authenticateUser,authorizePermissions} = require('../middleware/authentication');


const {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
  } = require('../controllers/showTimeController');



  router.route('/').post([authenticateUser, authorizePermissions('admin')], createCategory).get(getAllCategory);

  router
    .route('/:id')
    .get(getSingleCategory)
    .patch([authenticateUser, authorizePermissions('admin')], updateCategory)
    .delete([authenticateUser, authorizePermissions('admin')], deleteCategory);
  
  module.exports = router;
