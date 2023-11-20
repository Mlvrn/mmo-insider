import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import authSaga from '@pages/Auth/saga';

export default function* rootSaga() {
  yield all([appSaga(), authSaga()]);
}
