import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfileState = (state) => state.profile || initialState;

export const selectUserPosts = createSelector(selectProfileState, (state) => state.userPosts);
export const selectAuthor = createSelector(selectProfileState, (state) => state.author);
