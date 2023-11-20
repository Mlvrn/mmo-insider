import { call, put, takeLatest } from 'redux-saga/effects';
import { getPostsApi } from '@domain/api';
import { setAllPosts } from './actions';
import { GET_ALL_POSTS } from './constants';

export function* doGetAllPosts() {
  try {
    const response = yield call(getPostsApi);
    yield put(setAllPosts(response));
  } catch (error) {
    console.log(error, '<<<Error get all posts');
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
}
