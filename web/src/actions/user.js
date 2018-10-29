import { setPasswordKey } from '../util/crypt';
import user from '../reducers/user';
import { loadLists } from './lists';

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { username } } = getState();
  await setPasswordKey(username, password);
  dispatch(user.setMasterPassword());
  dispatch(loadLists());
};
