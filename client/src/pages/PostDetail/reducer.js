import { produce } from 'immer';
import { DELETE_POST_SUCCESS, RESET_DELETE_SUCCESS, SET_POST_BY_ID } from './constants';

export const initialState = {
  post: {},
  deleteSuccess: false,
};

export const storedKey = [];

const postDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST_BY_ID:
        draft.post = action.post;
        break;
      case DELETE_POST_SUCCESS:
        console.log('Reducer handling DELETE_POST_SUCCESS');
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default postDetailReducer;
