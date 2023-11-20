import { produce } from 'immer';

import {
  LOGIN_FAILURE,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  SET_LOGIN,
  SET_TOKEN,
} from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  data: null,
  error: null,
};

export const storedKey = ['token', 'login'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case LOGIN_FAILURE:
        draft.error = action.error;
        break;
      case REGISTRATION_SUCCESS:
        draft.data = action.data;
        break;
      case REGISTRATION_FAILURE:
        draft.error = action.error;
        break;
    }
  });

export default clientReducer;
