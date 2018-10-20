import items from '../reducers/items';

export function updateItem($listId, $id, payload) {
  return items.updateItem($listId, $id, payload);
}
