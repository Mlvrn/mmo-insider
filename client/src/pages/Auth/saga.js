import { setLoading } from '@containers/App/actions';
import { registrationSuccess, setLogin, setToken } from '@containers/Client/actions';
import { FORGOT_PASSWORD, LOGIN_USER, REGISTER_USER } from '@containers/Client/constants';
import { forgotPasswordApi, loginApi, registerApi } from '@domain/api';
import toast from 'react-hot-toast';

import { call, put, takeLatest } from 'redux-saga/effects';

export function* doRegister({ data, handleSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(registerApi, data);
    yield call(handleSuccess);
    yield put(registrationSuccess(response));
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Unexpected error occured.');
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doLogin({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, data);
    yield put(setToken(response.token));
    yield put(setLogin(true));
    toast.success('Logged in successfully');
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doForgotPassword(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(forgotPasswordApi, action.payload);
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_USER, doRegister);
  yield takeLatest(LOGIN_USER, doLogin);
  yield takeLatest(FORGOT_PASSWORD, doForgotPassword);
}
