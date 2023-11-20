import { getPostByIdApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setPostById } from './action';
import { GET_POST_BY_ID } from './constants';

export function* doGetPostById(action) {
  try {
    const response = yield call(getPostByIdApi, action.postId);
    yield put(setPostById(response));
  } catch (error) {
    console.log(error, '<<<Error get post by id');
  }
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_BY_ID, doGetPostById);
}
