import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminState = (state) => state.admin || initialState;

export const selectUsers = createSelector(selectAdminState, (state) => state.users);
