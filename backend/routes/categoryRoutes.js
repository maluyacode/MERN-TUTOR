const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { create, getCategory, getAllCategory, update, deleteCategory } = require('../controllers/categoryController')


router.post('/create', create);

router.get('/:id', getCategory);

router.get('/get/all', getAllCategory);

router.put('/:id', update);

router.delete('/:id', deleteCategory)


module.exports = router;
