import { setPasswordKey } from '../util/crypt';
import user from '../reducers/user';
import { loadLists } from './lists';
import * as api from '../util/api';

export const login = (username, password) => async () => {
  const u = await api.post('login', { username, password });
  console.log('+++', u);
};

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { username } } = getState();
  await setPasswordKey(username, password);
  dispatch(user.setMasterPassword());
  dispatch(loadLists());
};
