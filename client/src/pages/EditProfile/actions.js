import { EDIT_PROFILE, EDIT_PROFILE_SUCCESS } from './constants';

export const editProfile = (data, token) => ({
  type: EDIT_PROFILE,
  payload: { data, token },
});

export const editProfileSuccess = (updatedUserData) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: updatedUserData,
});
