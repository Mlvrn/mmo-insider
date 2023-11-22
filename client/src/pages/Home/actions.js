import { DOWNVOTE_POST, GET_ALL_POSTS, SET_ALL_POSTS, UNVOTE_POST, UPDATE_POST, UPVOTE_POST } from './constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
});

export const setAllPosts = (posts) => ({
  type: SET_ALL_POSTS,
  posts,
});

export const upvotePost = (postId, token) => ({
  type: UPVOTE_POST,
  payload: { postId, token, voteValue: { voteValue: 1 } },
});

export const downvotePost = (postId, token) => ({
  type: DOWNVOTE_POST,
  payload: { postId, token, voteValue: { voteValue: -1 } },
});

export const unvotePost = (postId, token) => ({
  type: UNVOTE_POST,
  payload: { postId, token },
});

export const updatePost = (updatedPost) => ({
  type: UPDATE_POST,
  payload: updatedPost,
});
