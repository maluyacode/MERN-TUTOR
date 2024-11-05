const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middleware/auth');

const { create, getCategory, getAllCategory, update, deleteCategory } = require('../controllers/categoryController')


router.post('/create', isAuthenticated, create);

router.get('/:id', isAuthenticated, getCategory);

router.get('/get/all', isAuthenticated, getAllCategory);

router.put('/:id', update);

router.delete('/:id', deleteCategory);


module.exports = router;
