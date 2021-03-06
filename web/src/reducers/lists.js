import { callable } from 'redux-callable';

export default callable({
  loadLists(state, lists) {
    return lists;
  },

  addList(lists, $id, $updatedAt, payload) {
    return [{ $id, $updatedAt, ...payload }].concat(lists);
  },

  updateList(lists, $id, $updatedAt, payload) {
    return lists.map(list => (
      list.$id === $id
        ? { ...list, ...payload, $updatedAt }
        : list
    ));
  },

  deleteList(lists, $id, $updatedAt) {
    return lists.map(list => (
      list.$id === $id
        ? { ...list, $updatedAt, $deleted: true }
        : list
    ));
  },
}, [], 'lists');
