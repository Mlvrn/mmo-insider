import {
  DOWNVOTE_POST,
  GET_ALL_POSTS,
  GET_PAGINATED_POSTS,
  SET_ALL_POSTS,
  SET_PAGINATED_POSTS,
  UNVOTE_POST,
  UPDATE_POST,
  UPVOTE_POST,
} from './constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
});

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  allPosts,
});

export const getPaginatedPosts = (page, limit) => ({
  type: GET_PAGINATED_POSTS,
  payload: { page, limit },
});

export const setPaginatedPosts = (data) => ({
  type: SET_PAGINATED_POSTS,
  payload: data,
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
