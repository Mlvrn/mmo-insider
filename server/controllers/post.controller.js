const { Post, User } = require('../models');
const {
  handleResponse,
  handleServerError,
} = require('../utils/responseHandler');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email'],
        },
      ],
      attributes: { exclude: ['authorId'] },
    });
    return handleResponse(res, 200, posts);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email'],
        },
      ],
      attributes: { exclude: ['authorId'] },
    });
    if (!post) {
      return handleResponse(res, 404, { message: 'Post not found.' });
    }
    return handleResponse(res, 200, post);
  } catch (error) {
    return handleServerError(res);
  }
};
