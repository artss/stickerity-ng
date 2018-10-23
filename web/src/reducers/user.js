import { callable } from 'redux-callable';

export default callable({
  setUser(state, name) {
    return { ...state, name };
  },
}, [], 'user');
