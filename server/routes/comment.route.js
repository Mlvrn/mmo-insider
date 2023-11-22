const express = require('express');

const { authenticate } = require('../middlewares/authentication');
const {
  getCommentsByPostId,
  createComment,
} = require('../controllers/comment.controller');

const router = express.Router();

router.use(authenticate);

router.get('/all/:postId', getCommentsByPostId);
router.post('/create/:postId', createComment);

module.exports = router;
