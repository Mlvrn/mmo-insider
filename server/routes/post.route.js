const express = require('express');
const { getPosts, getPostById } = require('../controllers/post.controller');
const router = express.Router();

router.get('/all', getPosts);
router.get('/:postId', getPostById);

module.exports = router;
