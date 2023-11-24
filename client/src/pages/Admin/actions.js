import { DELETE_USER_BY_ID, DELETE_USER_SUCCESS, GET_ALL_USERS, SET_ALL_USERS } from './constants';

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  users,
});

export const deleteUserById = (userId, token) => ({
  type: DELETE_USER_BY_ID,
  payload: { userId, token },
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});
