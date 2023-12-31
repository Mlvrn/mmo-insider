import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectUser = createSelector(selectClientState, (state) => state.user);
export const selectErrorMessage = createSelector(selectClientState, (state) => state.error);
export const selectCurrentUser = createSelector(selectClientState, (state) => state.currentUser);
