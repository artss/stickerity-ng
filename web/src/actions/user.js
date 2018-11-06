import { authPasswordHash, setPasswordKey } from '../util/crypt';
import user from '../reducers/user';
import { loadLists } from './lists';
import * as api from '../util/api';

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { salt } } = getState();
  await setPasswordKey(salt, password);
  dispatch(user.setMasterPassword());
  dispatch(loadLists());
};

export const authenticate = (email, password) => async (dispatch) => {
  dispatch(user.authPending());
  const hash = await authPasswordHash(email, password);

  try {
    const data = await api.post('auth/login', { email, password: hash });
    dispatch(user.setUser(data.user));
    dispatch(setMasterPassword(password));
  } catch (e) {
    dispatch(user.authError(e.message));
  }
};
