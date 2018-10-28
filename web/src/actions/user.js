import { setPasswordKey } from '../util/crypt';
import user from '../reducers/user';

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { username } } = getState();
  await setPasswordKey(username, password);
  dispatch(user.setMasterPassword());
};
