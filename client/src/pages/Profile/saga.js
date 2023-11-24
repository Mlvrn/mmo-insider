import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { getPostsByUsernameApi, getUserByUsernameApi } from '@domain/api';
import { setPostsByUsername, setUserByUsername } from './actions';
import { GET_POSTS_BY_USERNAME, GET_USER_BY_USERNAME } from './constants';

export function* doGetPostsByUsername(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostsByUsernameApi, action.username);
    yield put(setPostsByUsername(response));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetUserByUsername(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserByUsernameApi, action.username);
    yield put(setUserByUsername(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_POSTS_BY_USERNAME, doGetPostsByUsername);
  yield takeLatest(GET_USER_BY_USERNAME, doGetUserByUsername);
}
