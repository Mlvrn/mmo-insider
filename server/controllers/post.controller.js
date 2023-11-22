const { Sequelize } = require('sequelize');
const { Post, User, Vote } = require('../models');
const {
  handleResponse,
  handleServerError,
} = require('../utils/responseHandler');
const { createPostValidator } = require('../validators/post.validator');

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
      order: [['createdAt', 'DESC']],
    });
    return handleResponse(res, 200, posts);
  } catch (error) {
    console.log(error);
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

exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    const authorId = req.user.id;
    const { error, value } = createPostValidator.validate(postData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { title, shortDescription, content } = value;
    postData.mainImage = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      title,
      shortDescription,
      content,
      mainImage: postData.mainImage,
      authorId,
    });

    return handleResponse(res, 201, {
      post,
      message: 'Post created successfully!',
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postData = req.body;
    const userId = req.user.id;

    const { error, value } = createPostValidator.validate(postData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { title, shortDescription, content } = value;

    const [updatedRowCount] = await Post.update(
      {
        title,
        shortDescription,
        content,
        mainImage: req.file
          ? `/uploads/${req.file.filename}`
          : Sequelize.literal('mainImage'),
      },
      {
        where: { id: postId, authorId: userId },
      }
    );

    if (updatedRowCount === 0) {
      return handleResponse(res, 404, {
        message: 'Post not found or access denied',
      });
    }

    const updatedPost = await Post.findOne({ where: { id: postId } });

    return handleResponse(res, 200, {
      post: updatedPost,
      message: 'Post updated successfully!',
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findOne({
      where: { id: postId, authorId: userId },
    });

    if (!post) {
      return handleResponse(res, 404, {
        message: 'Post not found or access denied',
      });
    }

    await post.destroy();

    return handleResponse(res, 200, { message: 'Post deleted successfully' });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.voteOnPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { voteValue } = req.body; // +1 for like, -1 for dislike

  try {
    const [vote, created] = await Vote.findOrCreate({
      where: { userId, postId },
      defaults: { userId, postId, value: voteValue },
    });

    if (!created && vote.value !== voteValue) {
      vote.value = voteValue;
      await vote.save();
    }

    // Update the like count of the post
    const totalLikes = (await Vote.sum('value', { where: { postId } })) || 0;
    await Post.update({ voteCount: totalLikes }, { where: { id: postId } });

    const updatedPost = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email'],
        },
      ],
      attributes: { exclude: ['authorId'] },
    });

    return handleResponse(res, 200, {
      updatedPost,
      message: 'Voted post.',
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
