import lists from '../reducers/lists';

export function updateItem($listId, $id, payload) {
  return lists.updateItem($listId, $id, payload);
}
