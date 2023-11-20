import {
  LOGIN_FAILURE,
  LOGIN_USER,
  REGISTER_USER,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  SET_LOGIN,
  SET_TOKEN,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
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

export const registrationFailure = (error) => ({
  type: REGISTRATION_FAILURE,
  error,
});
