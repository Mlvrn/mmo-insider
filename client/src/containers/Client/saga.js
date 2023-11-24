import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { getUserByIdApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setUserById } from './actions';
import { GET_USER_BY_ID } from './constants';

export function* doGetUserById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserByIdApi, action.token);
    yield put(setUserById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* clientSaga() {
  yield takeLatest(GET_USER_BY_ID, doGetUserById);
}
