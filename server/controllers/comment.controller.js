const { Comment, User } = require('../models');
const {
  handleServerError,
  handleResponse,
} = require('../utils/responseHandler');

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.findAll({
      where: { postId, parentId: null },
      include: [
        {
          model: Comment,
          as: 'replies',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username', 'avatar'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['username', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return handleResponse(res, 200, { comments });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text, parentId } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;

    const comment = await Comment.create({
      text,
      parentId,
      userId,
      postId,
    });

    const user = await User.findOne({
      where: { id: userId },
      attributes: ['username', 'avatar'],
    });

    const responseComment = {
      id: comment.id,
      text: comment.text,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId,
      postId: parseInt(comment.postId),
      user: {
        username: user.username,
        avatar: user.avatar,
      },
      replies: [],
    };

    return handleResponse(res, 201, {
      comment: responseComment,
      message: 'Comment created successfully',
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
