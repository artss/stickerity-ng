import { saymyname } from '../util/saymyname';

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
}, {}, 'items');
