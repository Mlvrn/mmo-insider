import { setLoading } from '@containers/App/actions';
import { editProfileApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { EDIT_PROFILE } from './constants';
import { editProfileSuccess } from './actions';

export function* doEditProfile(action) {
  yield put(setLoading(true));
  try {
    const { data, token } = action.payload;
    const response = yield call(editProfileApi, data, token);
    toast.success(response.message);
    yield put(editProfileSuccess(response.user));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* editProfileSaga() {
  yield takeLatest(EDIT_PROFILE, doEditProfile);
}
