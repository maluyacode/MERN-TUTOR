const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { isAuthenticated } = require('../middleware/auth');

const productController = require('../controllers/productController');

router.post('/create', upload.array('images'), productController.create);

router.put('/update/:id', upload.array('images'), productController.update);

router.get('/single/:id', productController.getSingle);

router.get('/all', productController.all);

router.delete('/delete/:id', productController.delete);

router.put('/bulk/delete', productController.bulkDelete)

module.exports = router;