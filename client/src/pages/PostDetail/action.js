import {
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_REPLY,
  CREATE_REPLY_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  GET_COMMENTS_BY_POST_ID,
  GET_POST_BY_ID,
  RESET_DELETE_SUCCESS,
  SET_COMMENTS_BY_POST_ID,
  SET_POST_BY_ID,
} from './constants';

export const getPostById = (postId) => ({
  type: GET_POST_BY_ID,
  postId,
});

export const setPostById = (post, postId) => ({
  type: SET_POST_BY_ID,
  post,
  postId,
});

export const deletePostById = (postId, token) => ({
  type: DELETE_POST,
  payload: { postId, token },
});

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});

export const getCommentsByPostId = (postId) => ({
  type: GET_COMMENTS_BY_POST_ID,
  postId,
});

export const setCommentsByPostId = (comments, postId) => ({
  type: SET_COMMENTS_BY_POST_ID,
  payload: comments,
  postId,
});

export const createComment = (postId, text, token) => ({
  type: CREATE_COMMENT,
  payload: { postId, text, token },
});

export const createCommentSuccess = (comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment,
});

export const createReply = (postId, parentId, text, token) => ({
  type: CREATE_REPLY,
  payload: { postId, parentId, text, token },
});

export const createReplySuccess = (reply) => ({
  type: CREATE_REPLY_SUCCESS,
  payload: reply,
});
