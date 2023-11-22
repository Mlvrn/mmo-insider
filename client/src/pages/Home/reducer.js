import { produce } from 'immer';
import { SET_ALL_POSTS, UPDATE_POST } from './constants';

export const initialState = {
  posts: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_POSTS:
        draft.posts = action.posts;
        break;
      case UPDATE_POST:
        {
          console.log(action);
          const index = draft.posts.findIndex((post) => post.id === action.payload.id);
          if (index !== -1) {
            draft.posts[index] = action.payload;
          }
        }
        break;
    }
  });

export default homeReducer;
