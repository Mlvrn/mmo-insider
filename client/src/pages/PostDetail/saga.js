import { getPostByIdApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { setPostById } from './action';
import { GET_POST_BY_ID } from './constants';

export function* doGetPostById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostByIdApi, action.postId);
    yield put(setPostById(response));
  } catch (error) {
    console.log(error, '<<<Error get post by id');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_BY_ID, doGetPostById);
}
