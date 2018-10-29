import { callable } from 'redux-callable';

export default callable({
  setUser(user, username) {
    return { ...user, username };
  },

  setMasterPassword(user, error) {
    return {
      ...user,
      masterPasswordAdded: true,
      masterPasswordError: Boolean(error),
    };
  },
}, { masterPasswordAdded: false }, 'user');
