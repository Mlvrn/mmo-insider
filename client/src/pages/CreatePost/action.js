import { CREATE_POST, CREATE_POST_FAILURE, CREATE_POST_SUCCESS } from './constants';

export const createPost = (data, token) => ({
  type: CREATE_POST,
  payload: { data, token },
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});
