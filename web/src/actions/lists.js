import reducer from '../reducers/lists';
import user from '../reducers/user';
import { generateId } from '../util/id';
import { navigate } from '../util/history';
import {
  load,
  loadLocal,
  unload,
  save,
} from '../util/sync';
import { getTime } from '../util/time';
import {
  loadItems,
  unloadItems,
  saveItems,
  deleteItems,
} from './items';

const KEY = 'LISTS';
const ENDPOINT = 'lists';

export const loadLists = () => async (dispatch) => {
  const localLists = await loadLocal(KEY);

  if (localLists) {
    dispatch(reducer.loadLists(localLists));
  }

  try {
    const lists = await load(KEY, ENDPOINT, localLists);

    dispatch(reducer.loadLists(lists));
    dispatch(loadItems(lists.filter(({ $deleted }) => !$deleted).map(({ $id }) => $id)));
  } catch (e) {
    dispatch(user.setMasterPassword(e));
  }
};

export const unloadLists = () => (dispatch, getState) => {
  const { lists } = getState();
  dispatch(reducer.loadLists([]));
  unload(KEY);

  dispatch(unloadItems(lists.map(({ $id }) => $id)));
};

export const addList = payload => (dispatch, getState) => {
  const $id = generateId();
  dispatch(reducer.addList($id, getTime(), payload));
  navigate(`/lists/${$id}/edit`, null, true);

  const { lists, items } = getState();

  save(lists, KEY, ENDPOINT);
  saveItems($id, { items });
};

export const updateList = ($id, payload) => (dispatch, getState) => {
  dispatch(reducer.updateList($id, getTime(), payload));
  save(getState().lists, KEY, ENDPOINT);
};

export const deleteList = $id => (dispatch, getState) => {
  dispatch(reducer.deleteList($id, getTime()));
  dispatch(deleteItems($id));
  save(getState().lists, KEY, ENDPOINT);
};
