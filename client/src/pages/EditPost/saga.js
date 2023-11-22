import { editPostById } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';

import { UPDATE_POST_BY_ID } from './constants';

function* doUpdatePost(action) {
  yield put(setLoading(true));
  try {
    const { postId, data, token } = action.payload;
    const response = yield call(editPostById, postId, data, token);
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* editPostSaga() {
  yield takeLatest(UPDATE_POST_BY_ID, doUpdatePost);
}
