const { Comment } = require('../models');
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
        },
      ],
    });

    return handleResponse(res, 200, { comments });
  } catch (error) {
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

    return handleResponse(res, 201, {
      comment,
      message: 'Comment created successfully',
    });
  } catch (error) {
    return handleServerError(res);
  }
};
