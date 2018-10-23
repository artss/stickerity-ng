import items from '../reducers/items';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

export const addItem = ($listId, payload) => (dispatch) => {
  const $id = generateId();
  dispatch(items.addItem($listId, $id, payload));
  navigate(`/lists/${$listId}/${$id}`, null, true);
};

export function updateItem($listId, $id, payload) {
  return items.updateItem($listId, $id, payload);
}

export function deleteItem($listId, $id) {
  return items.deleteItem($listId, $id);
}
