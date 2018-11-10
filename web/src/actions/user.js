import { authPasswordHash, setPasswordKey, generateSalt } from '../util/crypt';
import user from '../reducers/user';
import { loadLists } from './lists';
import * as api from '../util/api';
import { navigate } from '../util/history';

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

export const register = (name, email, password) => (dispatch) => {
  if (!grecaptcha) {
    dispatch(user.authError('Recaptcha has not been loaded. Please try again later.'));
  }

  dispatch(user.authPending());

  grecaptcha.ready(async () => {
    const recaptchaToken = await grecaptcha.execute(RECAPTCHA_KEY, { action: 'register' });
    const salt = generateSalt();

    try {
      const { id } = await api.post('auth/register', {
        name,
        email,
        salt,
        recaptchaToken,
        password: await authPasswordHash(email, password),
      });

      dispatch(user.setUser({
        id,
        email,
        name,
        salt,
      }));

      dispatch(setMasterPassword(password));

      navigate('/activate', { registered: true });
    } catch (e) {
      dispatch(user.authError(e.message));
    }
  });
};

export const activate = (email, token) => async (dispatch) => {
  dispatch(user.authPending());

  try {
    const data = await api.post('auth/activate', { email, token });
    dispatch(user.setUser(data));
    navigate('/');
  } catch (e) {
    dispatch(user.authError(e.message));
  }
};
