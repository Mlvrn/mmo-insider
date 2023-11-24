import { setLoading } from '@containers/App/actions';
import { changePasswordApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CHANGE_PASSWORD } from './constants';

export function* doChangePassword(action) {
  yield put(setLoading(true));
  try {
    const { data, token } = action.payload;
    const response = yield call(changePasswordApi, data, token);
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, doChangePassword);
}
