const express = require('express');
const {
  register,
  login,
  verifyEmail,
  getUsers,
  getUserById,
  forgotPassword,
  deleteUserById,
  getUserByUsername,
  editProfile,
  changePassword,
} = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/authentication');
const { authorizeAdmin } = require('../middlewares/authorization');
const { uploadAvatar } = require('../middlewares/multer');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

router.get('/by/:username', getUserByUsername);

router.use(authenticate);

router.get('/all', authorizeAdmin, getUsers);
router.get('/', getUserById);
router.delete('/delete/:userId', authorizeAdmin, deleteUserById);
router.put('/profile', uploadAvatar, editProfile);
router.put('/profile/change-password', changePassword);

module.exports = router;
