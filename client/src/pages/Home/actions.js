import { GET_ALL_POSTS, SET_ALL_POSTS } from './constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
});

export const setAllPosts = (posts) => ({
  type: SET_ALL_POSTS,
  posts,
});
