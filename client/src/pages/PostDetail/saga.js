import { deletePostByIdApi, getPostByIdApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import { deletePostSuccess, setPostById } from './action';
import { DELETE_POST, GET_POST_BY_ID } from './constants';

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

function* doDeletePost(action) {
  try {
    yield call(deletePostByIdApi, action.payload.postId, action.payload.token);
    yield put(deletePostSuccess(action.payload.postId));
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_BY_ID, doGetPostById);
  yield takeLatest(DELETE_POST, doDeletePost);
}
