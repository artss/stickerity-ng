import { saymyname } from '../util/saymyname';

export default saymyname({
  addList(lists, $id, payload) {
    return [{ $id, ...payload }].concat(lists);
  },

  updateList(lists, $id, payload) {
    return lists.map(list => (
      list.$id === $id
        ? { ...list, ...payload }
        : list
    ));
  },
}, [], 'lists');
