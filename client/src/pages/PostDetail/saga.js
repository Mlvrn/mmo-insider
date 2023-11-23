import { createCommentApi, deletePostByIdApi, getCommentsByPostIdApi, getPostByIdApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import {
  createCommentSuccess,
  createReplySuccess,
  deletePostSuccess,
  getCommentsByPostId,
  setCommentsByPostId,
  setPostById,
} from './action';
import { CREATE_COMMENT, CREATE_REPLY, DELETE_POST, GET_COMMENTS_BY_POST_ID, GET_POST_BY_ID } from './constants';

export function* doGetPostById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostByIdApi, action.postId);
    yield put(setPostById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeletePost(action) {
  try {
    const response = yield call(deletePostByIdApi, action.payload.postId, action.payload.token);
    yield put(deletePostSuccess(action.payload.postId));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export function* doGetCommentsByPostId(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getCommentsByPostIdApi, action.postId);
    yield put(setCommentsByPostId(response, action.postId));
  } catch (error) {
    toast.error(error.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doCreateComment(action) {
  yield put(setLoading(true));
  try {
    const { postId, text, token } = action.payload;
    const response = yield call(createCommentApi, postId, { text }, token);
    yield put(createCommentSuccess(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doCreateReply(action) {
  try {
    const { postId, parentId, text, token } = action.payload;
    const response = yield call(createCommentApi, postId, { text, parentId }, token);
    yield put(createReplySuccess(response.comment));

    yield put(getCommentsByPostId(postId));
  } catch (error) {
    toast.error(error.message);
  }
}

export default function* postDetailSaga() {
  yield takeLatest(GET_POST_BY_ID, doGetPostById);
  yield takeLatest(DELETE_POST, doDeletePost);
  yield takeLatest(GET_COMMENTS_BY_POST_ID, doGetCommentsByPostId);
  yield takeLatest(CREATE_COMMENT, doCreateComment);
  yield takeLatest(CREATE_REPLY, doCreateReply);
}
