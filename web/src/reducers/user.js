import { saymyname } from '../util/saymyname';

export default saymyname({
  setUser(state, name) {
    return { ...state, name };
  },
}, [], 'user');
