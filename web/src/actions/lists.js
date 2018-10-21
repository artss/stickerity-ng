import lists from '../reducers/lists';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

export const addList = payload => (dispatch) => {
  const $id = generateId();
  dispatch(lists.addList($id, payload));
  navigate(`/lists/${$id}/edit`, null, true);
};

export function updateList($id, payload) {
  return lists.updateList($id, payload);
}

export function deleteList($id) {
  return lists.deleteList($id);
}
