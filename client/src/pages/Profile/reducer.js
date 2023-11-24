import { produce } from 'immer';
import { SET_POSTS_BY_USERNAME, SET_USER_BY_USERNAME } from './constants';

export const initialState = {
  userPosts: [],
  author: null,
};

export const storedKey = [];

const profileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POSTS_BY_USERNAME:
        draft.userPosts = action.payload.posts;
        break;
      case SET_USER_BY_USERNAME:
        draft.author = action.payload.user;
        break;
    }
  });

export default profileReducer;
