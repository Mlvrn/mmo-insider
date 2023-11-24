import { produce } from 'immer';
import {
  CREATE_COMMENT_SUCCESS,
  CREATE_REPLY_SUCCESS,
  DELETE_POST_SUCCESS,
  RESET_DELETE_SUCCESS,
  SET_COMMENTS_BY_POST_ID,
  SET_POST_BY_ID,
} from './constants';

export const initialState = {
  post: {},
  deleteSuccess: false,
  comments: [],
};

export const storedKey = [];

const postDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST_BY_ID:
        draft.post = action.post;
        break;
      case DELETE_POST_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
      case SET_COMMENTS_BY_POST_ID:
        draft.comments = action.payload.comments;
        break;
      case CREATE_COMMENT_SUCCESS:
        draft.comments.unshift(action.payload.comment);
        break;
      case CREATE_REPLY_SUCCESS: {
        const { parentId } = action.payload;
        const commentToUpdate = draft.comments.find((comment) => comment.id === parentId);
        if (commentToUpdate) {
          commentToUpdate.replies.push(action.payload);
        }
        break;
      }
    }
  });

export default postDetailReducer;
