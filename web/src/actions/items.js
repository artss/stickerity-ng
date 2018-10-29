import reducer from '../reducers/items';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

/*
const ITEMS_KEY = 'ITEMS';

export const loadItems = $listId => (dispatch) => {

};
*/

export const addItem = ($listId, payload) => (dispatch) => {
  const $id = generateId();
  dispatch(reducer.addItem($listId, $id, payload));
  navigate(`/lists/${$listId}/${$id}`, null, true);
};

export function updateItem($listId, $id, payload) {
  return reducer.updateItem($listId, $id, payload);
}

export function deleteItem($listId, $id) {
  return reducer.deleteItem($listId, $id);
}
