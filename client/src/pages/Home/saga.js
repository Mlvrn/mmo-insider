import { call, put, takeLatest } from 'redux-saga/effects';
import { getPaginatedPostsApi, getPostsApi, getUserByIdApi, votePostApi } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { setUser } from '@containers/Client/actions';
import { SET_TOKEN } from '@containers/Client/constants';
import { setAllPosts, setPaginatedPosts, updatePost } from './actions';
import { DOWNVOTE_POST, GET_ALL_POSTS, GET_PAGINATED_POSTS, UPVOTE_POST } from './constants';

export function* doGetAllPosts() {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostsApi);
    yield put(setAllPosts(response));
  } catch (error) {
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetPaginatedPosts(action) {
  const { page, limit } = action.payload;
  yield put(setLoading(true));
  try {
    const response = yield call(getPaginatedPostsApi, page, limit);
    yield put(
      setPaginatedPosts({
        posts: response.posts,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      })
    );
  } catch (error) {
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetUserById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserByIdApi, action.token);

    yield put(setUser(response));
  } catch (error) {
    toast.error('Unexpected error occured');
  } finally {
    yield put(setLoading(false));
  }
}

function* doVotePost(action) {
  yield put(setLoading(true));
  try {
    const { postId, token, voteValue } = action.payload;
    const response = yield call(votePostApi, postId, voteValue, token);
    yield put(updatePost(response.updatedPost));
  } catch (error) {
    toast.error('Error voting post');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
  yield takeLatest(GET_PAGINATED_POSTS, doGetPaginatedPosts);
  yield takeLatest(SET_TOKEN, doGetUserById);
  yield takeLatest(UPVOTE_POST, doVotePost);
  yield takeLatest(DOWNVOTE_POST, doVotePost);
}
