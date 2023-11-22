const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  editPostById,
  deletePostById,
  voteOnPost,
} = require('../controllers/post.controller');
const uploadMiddleware = require('../middlewares/multer');
const { authenticate } = require('../middlewares/authentication');

const router = express.Router();

router.get('/all', getPosts);
router.get('/:postId', getPostById);

router.use(authenticate);

router.post('/create', uploadMiddleware, createPost);
router.put('/edit/:postId', uploadMiddleware, editPostById);
router.delete('/delete/:postId', deletePostById);
router.post('/vote/:postId', voteOnPost);

module.exports = router;
