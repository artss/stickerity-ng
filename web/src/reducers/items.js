import { callable } from 'redux-callable';
import lists from './lists';

export default callable({
  loadItems(state, items) {
    return { ...state, ...items };
  },

  addItem(items, $listId, $id, payload) {
    return {
      ...items,
      [$listId]: [{ $id, ...payload }].concat(items[$listId]),
    };
  },

  updateItem(items, $listId, $id, payload) {
    return {
      ...items,
      [$listId]: items[$listId].map(item => (
        item.$id === $id
          ? { ...item, ...payload }
          : item
      )),
    };
  },

  deleteItem(items, $listId, $id) {
    return {
      ...items,
      [$listId]: items[$listId].filter(item => item.$id !== $id),
    };
  },

  [lists.addList]: (items, $id) => ({ ...items, [$id]: [] }),

  [lists.deleteList]: (items, $id) => ({ ...items, [$id]: undefined }),
}, {}, 'items');
