import { produce } from 'immer';
import { SET_ALL_POSTS, SET_PAGINATED_POSTS, UPDATE_POST } from './constants';

export const initialState = {
  posts: [],
  allPosts: [],
  totalPages: 0,
  currentPage: 1,
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_POSTS:
        draft.allPosts = action.allPosts;
        break;
      case SET_PAGINATED_POSTS:
        draft.posts = action.payload.posts;
        draft.totalPages = action.payload.totalPages;
        draft.currentPage = action.payload.currentPage;
        break;
      case UPDATE_POST:
        {
          const index = draft.posts.findIndex((post) => post.id === action.payload.id);
          if (index !== -1) {
            draft.posts[index] = action.payload;
          }
        }
        break;
    }
  });

export default homeReducer;
