import { saymyname } from '../util/saymyname';
import lists from './lists';

export default saymyname({
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

  [lists.addList]: (items, $id) => ({ ...items, [$id]: [] }),

  [lists.deleteList]: (items, $id) => ({ ...items, [$id]: undefined }),
}, {}, 'items');
