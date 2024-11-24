const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const userController = require('../controllers/userController');
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');

router.post("/register", upload.array('images'), userController.register);

router.post('/login', userController.login);

router.put('/update/:id', upload.array('images'), userController.update);

router.post('/token', isAuthenticatedV2, userController.saveToken);

router.get('/profile', isAuthenticatedV2, userController.getSingle);

module.exports = router;