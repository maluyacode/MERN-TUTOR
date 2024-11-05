const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const userController = require('../controllers/userController');

router.post("/register", upload.array('images'), userController.register);

router.post('/login', userController.login);

module.exports = router;