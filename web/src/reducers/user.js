import { callable } from 'redux-callable';

export default callable({
  authPending(user) {
    return {
      ...user,
      authPending: true,
      authError: null,
    };
  },

  authError(user, authError) {
    return {
      ...user,
      authPending: false,
      authError,
    };
  },

  setUser(user, data) {
    return {
      ...user,
      ...data,
      authPending: false,
      authError: null,
    };
  },

  unsetUser(user) {
    const {
      id,
      name,
      email,
      salt,
      ...rest
    } = user;

    return rest;
  },

  setMasterPassword(user, error) {
    return {
      ...user,
      masterPasswordAdded: true,
      masterPasswordError: Boolean(error),
    };
  },
}, { masterPasswordAdded: false }, 'user');
