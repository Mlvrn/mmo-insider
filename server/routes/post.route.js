const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  editPostById,
  deletePostById,
  voteOnPost,
  getPaginatedPosts,
  getPostsByUser,
} = require('../controllers/post.controller');
const { authenticate } = require('../middlewares/authentication');
const { uploadPostImage } = require('../middlewares/multer');

const router = express.Router();

router.get('/all', getPosts);
router.get('/paginate', getPaginatedPosts);
router.get('/:postId', getPostById);
router.get('/all/:username', getPostsByUser);

router.use(authenticate);

router.post('/create', uploadPostImage, createPost);
router.put('/edit/:postId', uploadPostImage, editPostById);
router.delete('/delete/:postId', deletePostById);
router.post('/vote/:postId', voteOnPost);

module.exports = router;
