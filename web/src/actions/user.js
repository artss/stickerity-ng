import { setPasswordKey } from '../util/crypt';
import user from '../reducers/user';
import { loadLists } from './lists';
import * as api from '../util/api';

export const authenticate = (email, password) => async () => {
  await api.post('auth/login', { email, password });
};

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { salt } } = getState();
  await setPasswordKey(salt, password);
  dispatch(user.setMasterPassword());
  dispatch(loadLists());
};
