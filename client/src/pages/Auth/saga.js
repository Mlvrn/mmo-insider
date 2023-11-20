import { loginFailure, registrationFailure, registrationSuccess, setLogin, setToken } from '@containers/Client/actions';
import { LOGIN_USER, REGISTER_USER } from '@containers/Client/constants';
import { loginApi, registerApi } from '@domain/api';

import { call, put, takeLatest } from 'redux-saga/effects';

export function* doRegister({ data, handleSuccess }) {
  try {
    const response = yield call(registerApi, data);
    yield call(handleSuccess);
    yield put(registrationSuccess(response));
  } catch (error) {
    if (error.response && error.response.data) {
      yield put(registrationFailure(error.response.data.message));
    }
  }
}

function* doLogin({ data }) {
  try {
    const response = yield call(loginApi, data);
    yield put(setToken(response.token));
    yield put(setLogin(true));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_USER, doRegister);
  yield takeLatest(LOGIN_USER, doLogin);
}
