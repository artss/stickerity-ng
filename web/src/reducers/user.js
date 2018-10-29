import { callable } from 'redux-callable';

export default callable({
  setUser(user, username) {
    return { ...user, username };
  },

  setMasterPassword(user) {
    return { ...user, masterPasswordAdded: true };
  },
}, { masterPasswordAdded: false }, 'user');
