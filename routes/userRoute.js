const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const { checkAuth } = require('../middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

/**
 * @swagger
 * /upload:
 * /user/editProfile:
 *   post:
 *     summary: edit Profile API
 *     security:
 *      - bearerAuth: []
 *     tags: [User Profile]
 *     requestBody:
 *       description: Student object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               mobile:
 *                 type: string
 *               bio:
 *                 type: string
 *               profile_type:
 *                 type: string
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
router.post('/user/editProfile', checkAuth, upload.single('profile_image'), userController.editProfile);



/**
 * @swagger
 * /user/getProfileDetails:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: user_id
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *     summary: Profile Details API
 *     tags: [User Profile]
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
router.get('/user/getProfileDetails', checkAuth, userController.getProfileDetails);


module.exports = router;