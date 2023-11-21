import { call, put, takeLatest } from 'redux-saga/effects';
import { getPostsApi, getUserByIdApi } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { setUser } from '@containers/Client/actions';
import { SET_TOKEN } from '@containers/Client/constants';
import { setAllPosts } from './actions';
import { GET_ALL_POSTS } from './constants';

export function* doGetAllPosts() {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostsApi);
    yield put(setAllPosts(response));
  } catch (error) {
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetUserById(action) {
  try {
    const response = yield call(getUserByIdApi, action.token);

    yield put(setUser(response));
  } catch (error) {
    toast.error('Unexpected error occured');
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
  yield takeLatest(SET_TOKEN, doGetUserById);
}
