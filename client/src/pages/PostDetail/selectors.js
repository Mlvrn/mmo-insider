import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPostDetailState = (state) => state.postDetail || initialState;

export const selectPost = createSelector(selectPostDetailState, (state) => state.post);
export const selectDeleteSuccess = createSelector(selectPostDetailState, (state) => state.deleteSuccess);
export const selectComments = createSelector(selectPostDetailState, (state) => state.comments);
