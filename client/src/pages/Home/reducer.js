import { produce } from 'immer';
import { SET_ALL_POSTS } from './constants';

export const initialState = {
  posts: [],
};

export const storedKey = ['posts'];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_POSTS:
        draft.posts = action.posts;
        break;
    }
  });

export default homeReducer;
