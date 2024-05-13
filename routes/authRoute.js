const express = require('express');
const authController = require('../controllers/authController');
const { checkAuth } = require('../middleware');
const router = express.Router();

router.post('/auth/login', authController.loginUser);
router.post('/auth/register', authController.registerUser);
router.post('/auth/logout', checkAuth, authController.logoutUser);


module.exports = router;