import lists from '../reducers/lists';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

export const addList = payload => (dispatch) => {
  const $id = generateId();
  dispatch(lists.addList($id, payload));
  navigate(`/lists/${$id}`);
};
