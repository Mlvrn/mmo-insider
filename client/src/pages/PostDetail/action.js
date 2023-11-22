import { DELETE_POST, DELETE_POST_SUCCESS, GET_POST_BY_ID, RESET_DELETE_SUCCESS, SET_POST_BY_ID } from './constants';

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
