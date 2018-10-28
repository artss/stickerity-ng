import { callable } from 'redux-callable';

import { encryptObject, decryptObject, setPasswordKey } from '../util/crypt';

/* eslint-disable */
const LISTS_KEY = 'LISTS';

async function save(state) {
  const key = await setPasswordKey('arts', 'ololo');
  const encData = await encryptObject(state, key);
  console.log('---- enc', encData);
  const decData = await decryptObject(encData, key);
  console.log('++++ lists', decData);
}
/* eslint-enable */

export default callable({
  addList(lists, $id, payload) {
    const state = [{ $id, ...payload }].concat(lists);
    save(state);
    return state;
  },

  updateList(lists, $id, payload) {
    const state = lists.map(list => (
      list.$id === $id
        ? { ...list, ...payload }
        : list
    ));
    save(state);
    return state;
  },

  deleteList(lists, $id) {
    const state = lists.filter(item => item.$id !== $id);
    save(state);
    return state;
  },
}, [], 'lists');
