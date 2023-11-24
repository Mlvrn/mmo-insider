import { produce } from 'immer';

import {
  LOGOUT_USER,
  REGISTRATION_SUCCESS,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
  SET_USER_BY_ID,
} from '@containers/Client/constants';
import { EDIT_PROFILE_SUCCESS } from '@pages/EditProfile/constants';

export const initialState = {
  login: false,
  token: null,
  user: null,
  data: null,
  error: null,
  currentUser: null,
};

export const storedKey = ['token', 'login', 'user'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case REGISTRATION_SUCCESS:
        draft.data = action.data;
        break;
      case SET_USER_BY_ID:
        draft.currentUser = action.payload;
        break;
      case EDIT_PROFILE_SUCCESS:
        draft.currentUser = action.payload;
        break;
      case LOGOUT_USER:
        return initialState;
    }
  });

export default clientReducer;
