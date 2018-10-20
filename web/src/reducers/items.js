import { saymyname, id } from '../util/saymyname';
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

  [id(lists.addList)]: (items, $id) => ({ ...items, [$id]: [] }),
}, {}, 'items');
