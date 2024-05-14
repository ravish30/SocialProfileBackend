const express = require('express');
const authController = require('../controllers/authController');
const { checkAuth } = require('../middleware');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User API
 *     tags: [Authentication]
 *     requestBody:
 *       description: Student object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                email: "abc@gmail.com"
 *                password: "1234"
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something Went Wrong
 */
router.post('/auth/login', authController.loginUser);


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User API
 *     tags: [Authentication]
 *     requestBody:
 *       description: Student object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               mobile:
 *                 type: string
 *               bio:
 *                 type: string
 *               userType:
 *                 type: string
 *             example:
 *                email: "abc@gmail.com"
 *                password: "1234"
 *                firstname: "abc"
 *                lastname: "abc"
 *                mobile: "9999999999"
 *                bio: "hey"
 *                userType: "admin"
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something Went Wrong
 */
router.post('/auth/register', authController.registerUser);


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout User API
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {}
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Something Went Wrong
 */
router.post('/auth/logout', checkAuth, authController.logoutUser);


module.exports = router;