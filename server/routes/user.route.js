const express = require('express');
const {
  register,
  login,
  verifyEmail,
  getUsers,
  getUserById,
} = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/authentication');
const { authorizeAdmin } = require('../middlewares/authorization');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/verify-email', verifyEmail);

router.use(authenticate);
router.get('/all', authorizeAdmin, getUsers);
router.get('/', getUserById);

module.exports = router;
