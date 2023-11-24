import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteUserByIdApi, getUsersApi } from '@domain/api';

import { deleteUserSuccess, setAllUsers } from './actions';
import { DELETE_USER_BY_ID, GET_ALL_USERS } from './constants';

export function* doGetAllUsers() {
  yield put(setLoading(true));
  try {
    const response = yield call(getUsersApi);
    yield put(setAllUsers(response));
  } catch (error) {
    toast.error('Error fetching users');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteUserById(action) {
  yield put(setLoading(true));
  try {
    const { userId, token } = action.payload;
    const response = yield call(deleteUserByIdApi, userId, token);

    toast.success(response.message);
    yield put(deleteUserSuccess(userId));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* adminSaga() {
  yield takeLatest(GET_ALL_USERS, doGetAllUsers);
  yield takeLatest(DELETE_USER_BY_ID, doDeleteUserById);
}
