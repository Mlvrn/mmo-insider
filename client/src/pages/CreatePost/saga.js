import { call, put, takeLatest } from 'redux-saga/effects';
import { createPostApi } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';

import { CREATE_POST } from './constants';

function* doCreatePost(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createPostApi, action.payload.data, action.payload.token);

    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* createPostSaga() {
  yield takeLatest(CREATE_POST, doCreatePost);
}
