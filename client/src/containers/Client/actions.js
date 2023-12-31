import {
  FORGOT_PASSWORD,
  GET_USER_BY_ID,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTRATION_SUCCESS,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER,
  SET_USER_BY_ID,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data,
});

export const registerUser = (data, handleSuccess) => ({
  type: REGISTER_USER,
  data,
  handleSuccess,
});

export const registrationSuccess = (data) => ({
  type: REGISTRATION_SUCCESS,
  data,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const forgotPasswordRequest = (email) => ({
  type: FORGOT_PASSWORD,
  payload: { email },
});

export const getUserById = (token) => ({
  type: GET_USER_BY_ID,
  token,
});

export const setUserById = (user, token) => ({
  type: SET_USER_BY_ID,
  payload: user,
  token,
});
