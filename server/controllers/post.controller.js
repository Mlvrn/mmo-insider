const { Sequelize } = require('sequelize');
const { Post, User, Vote, Comment } = require('../models');
const {
  handleResponse,
  handleServerError,
} = require('../utils/responseHandler');
const fs = require('fs');
const path = require('path');
const { createPostValidator } = require('../validators/post.validator');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email', 'avatar'],
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

exports.getPaginatedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: posts } = await Post.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return handleResponse(res, 200, {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalPosts: count,
      posts,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return handleResponse(res, 404, { message: 'User not found.' });
    }

    const posts = await Post.findAll({
      where: {
        authorId: user.id,
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email', 'avatar'],
        },
      ],
      attributes: { exclude: ['authorId'] },
      order: [['createdAt', 'DESC']],
    });

    return handleResponse(res, 200, { posts });
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
          attributes: ['id', 'username', 'email', 'avatar'],
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

    const currentPost = await Post.findOne({
      where: { id: postId, authorId: userId },
    });
    if (!currentPost) {
      return handleResponse(res, 404, {
        message: 'Post not found or access denied',
      });
    }

    let mainImagePath;
    if (req.file) {
      mainImagePath = `/uploads/${req.file.filename}`;

      if (currentPost.mainImage) {
        const oldImagePath = path.join(__dirname, '..', currentPost.mainImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Failed to delete old image:', err);
        });
      }
    }

    await Post.update(
      {
        title,
        shortDescription,
        content,
        mainImage: mainImagePath || Sequelize.literal('mainImage'),
      },
      { where: { id: postId, authorId: userId } }
    );

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

    const postToDelete =
      req.user.role === 1
        ? await Post.findByPk(postId)
        : await Post.findOne({ where: { id: postId, authorId: userId } });

    if (!postToDelete) {
      return handleResponse(res, 404, {
        message: 'Post not found or access denied',
      });
    }

    await postToDelete.destroy();

    return handleResponse(res, 200, { message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.voteOnPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { voteValue } = req.body;

  try {
    const [vote, created] = await Vote.findOrCreate({
      where: { userId, postId },
      defaults: { userId, postId, value: voteValue },
    });

    if (!created && vote.value !== voteValue) {
      vote.value = voteValue;
      await vote.save();
    }

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
