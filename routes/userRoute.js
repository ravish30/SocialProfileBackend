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


router.post('/user/editProfile', checkAuth, upload.single('profile_image'), userController.editProfile);
router.get('/user/getProfileDetails', checkAuth, userController.getProfileDetails);


module.exports = router;