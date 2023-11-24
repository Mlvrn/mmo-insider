import { GET_POSTS_BY_USERNAME, GET_USER_BY_USERNAME, SET_POSTS_BY_USERNAME, SET_USER_BY_USERNAME } from './constants';

export const getPostsByUsername = (username) => ({
  type: GET_POSTS_BY_USERNAME,
  username,
});

export const setPostsByUsername = (posts, username) => ({
  type: SET_POSTS_BY_USERNAME,
  payload: posts,
  username,
});

export const getUserByUsername = (username) => ({
  type: GET_USER_BY_USERNAME,
  username,
});

export const setUserByUsername = (user, username) => ({
  type: SET_USER_BY_USERNAME,
  payload: user,
  username,
});
