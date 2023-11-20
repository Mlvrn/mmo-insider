import { GET_POST_BY_ID, SET_POST_BY_ID } from './constants';

export const getPostById = (postId) => ({
  type: GET_POST_BY_ID,
  postId,
});

export const setPostById = (post, postId) => ({
  type: SET_POST_BY_ID,
  post,
  postId,
});
