const express = require('express');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comment.route');
const router = express.Router();

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

module.exports = router;
