import { produce } from 'immer';
import { DELETE_USER_SUCCESS, SET_ALL_USERS } from './constants';

export const initialState = {
  users: [],
};

export const storedKey = [];

const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_USERS:
        draft.users = action.users;
        break;
      case DELETE_USER_SUCCESS:
        draft.users = draft.users.filter((user) => user.id !== action.payload);
        break;
    }
  });

export default adminReducer;
