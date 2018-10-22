import items from '../reducers/items';

export function updateItem($listId, $id, payload) {
  return items.updateItem($listId, $id, payload);
}

export function deleteItem($listId, $id) {
  return items.deleteItem($listId, $id);
}
