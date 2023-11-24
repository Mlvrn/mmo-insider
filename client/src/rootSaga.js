import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import authSaga from '@pages/Auth/saga';
import homeSaga from '@pages/Home/saga';
import postDetailSaga from '@pages/PostDetail/saga';
import createPostSaga from '@pages/CreatePost/saga';
import editPostSaga from '@pages/EditPost/saga';
import adminSaga from '@pages/Admin/saga';
import profileSaga from '@pages/Profile/saga';
import editProfileSaga from '@pages/EditProfile/saga';
import clientSaga from '@containers/Client/saga';
import changePasswordSaga from '@pages/ChangePassword/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    authSaga(),
    homeSaga(),
    postDetailSaga(),
    createPostSaga(),
    editPostSaga(),
    adminSaga(),
    profileSaga(),
    editProfileSaga(),
    clientSaga(),
    changePasswordSaga(),
  ]);
}
