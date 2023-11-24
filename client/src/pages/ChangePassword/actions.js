import { CHANGE_PASSWORD } from './constants';

export const changePassword = (data, token) => ({
  type: CHANGE_PASSWORD,
  payload: { data, token },
});
