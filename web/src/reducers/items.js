import { callable } from 'redux-callable';
import lists from './lists';

export default callable({
  loadItems(state, items) {
    return { ...state, ...items };
  },

  addItem(items, $listId, $id, $updatedAt, payload) {
    return {
      ...items,
      [$listId]: [{ $id, $updatedAt, ...payload }].concat(items[$listId] || []),
    };
  },

  updateItem(items, $listId, $id, $updatedAt, payload) {
    return {
      ...items,
      [$listId]: items[$listId].map(item => (
        item.$id === $id
          ? { ...item, ...payload, $updatedAt }
          : item
      )),
    };
  },

  deleteItem(items, $listId, $id, $updatedAt) {
    return {
      ...items,
      [$listId]: items[$listId].map(item => (
        item.$id === $id
          ? { ...item, $updatedAt, $deleted: true }
          : item
      )),
    };
  },

  sortItems(items, $listId, ids, movedId, $updatedAt) {
    const activeItems = items[$listId].filter(({ $deleted }) => !$deleted);
    const deletedItems = items[$listId].filter(({ $deleted }) => $deleted);
    return {
      ...items,
      [$listId]: ids
        .map(i => (
          activeItems[i].$id === movedId
            ? { ...activeItems[i], $updatedAt }
            : activeItems[i]
        ))
        .concat(deletedItems),
    };
  },

  [lists.addList]: (items, $id) => ({ ...items, [$id]: [] }),

  // [lists.deleteList]: (items, $id) => ({ ...items, [$id]: undefined }),
}, {}, 'items');
