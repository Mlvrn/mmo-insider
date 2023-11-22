import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import authSaga from '@pages/Auth/saga';
import homeSaga from '@pages/Home/saga';
import postDetailSaga from '@pages/PostDetail/saga';
import createPostSaga from '@pages/CreatePost/saga';

export default function* rootSaga() {
  yield all([appSaga(), authSaga(), homeSaga(), postDetailSaga(), createPostSaga()]);
}
