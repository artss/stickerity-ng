import {
  authPasswordHash,
  setPasswordKey,
  unsetPasswordKey,
  generateSalt,
} from '../util/crypt';
import user from '../reducers/user';
import { loadLists, unloadLists } from './lists';
import * as api from '../util/api';
import { navigate } from '../util/history';

const USER_KEY = 'USER';

function save(data) {
  if (typeof data === 'undefined') {
    localStorage.removeItem(USER_KEY);
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(data || {}));
}

export const unsetUser = () => (dispatch) => {
  dispatch(user.unsetUser());
  save();
  dispatch(unloadLists());
  unsetPasswordKey();
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(user.setUser(JSON.parse(localStorage.getItem(USER_KEY))));
  } catch (e) {
    dispatch(unsetUser());
  }

  try {
    const data = await api.get('user/profile');
    dispatch(user.setUser(data));
    save(data);
  } catch (e) {
    if (e.code === 401) {
      dispatch(unsetUser());
    }
  }
};

export const setMasterPassword = password => async (dispatch, getState) => {
  const { user: { salt } } = getState();
  await setPasswordKey(salt, password);
  dispatch(user.setMasterPassword());
  dispatch(loadLists());
};

export const authenticate = (email, password) => async (dispatch) => {
  dispatch(user.authPending());

  grecaptcha.ready(async () => {
    try {
      const [hash, recaptchaToken] = await Promise.all([
        authPasswordHash(email, password),
        grecaptcha.execute(RECAPTCHA_KEY, { action: 'login' }),
      ]);

      const data = await api.post('auth/login', {
        email,
        recaptchaToken,
        password: hash,
      });
      dispatch(user.setUser(data));
      dispatch(setMasterPassword(password));
      save(data);
    } catch (e) {
      dispatch(user.authError(e.message));
      save();
    }
  });
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

      const data = {
        id,
        email,
        name,
        salt,
      };

      dispatch(user.setUser(data));
      dispatch(setMasterPassword(password));
      save(data);

      navigate('/activate', { registered: true });
    } catch (e) {
      dispatch(user.authError(e.message));
      save();
    }
  });
};

export const activate = (email, token) => async (dispatch) => {
  dispatch(user.authPending());

  try {
    const data = await api.post('auth/activate', { email, token });
    dispatch(user.setUser(data));
    save(data);

    navigate('/lists');
  } catch (e) {
    dispatch(user.authError(e.message));
    save();
  }
};

export const saveProfile = ({ name, newEmail, password }) => async (dispatch, getState) => {
  dispatch(user.authPending());
  const { user: { email } } = getState();

  const newEmailPassword = await authPasswordHash(newEmail, password);
  const currentPassword = await authPasswordHash(email, password);

  try {
    const data = await api.post('user/profile', {
      name,
      email,
      newEmail,
      password: currentPassword,
      newEmailPassword,
    });

    dispatch(user.setUser(data));
    save(data);
  } catch (e) {
    dispatch(user.authError(e.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.post('auth/logout');
  } catch (e) {
    console.error(e);
  }

  dispatch(unsetUser());
};
