import { loadItems } from './items';
import reducer from '../reducers/lists';
import user from '../reducers/user';
import { generateId } from '../util/id';
import { navigate } from '../util/history';

import {
  getKey,
  generateKey,
  exportKey,
  importKey,
  encryptObject,
  decryptObject,
} from '../util/crypt';

const LISTS_KEY = 'LISTS';

async function save({ lists }) {
  let key = getKey(LISTS_KEY);

  if (!key) {
    key = await generateKey(LISTS_KEY);
  }

  const k = await exportKey(LISTS_KEY);
  const data = await encryptObject(lists, key);

  localStorage.setItem(LISTS_KEY, JSON.stringify({ k, data }));
}

export const loadLists = () => async (dispatch) => {
  const rawData = localStorage.getItem(LISTS_KEY);

  if (!rawData) {
    return;
  }

  try {
    const { k, data } = JSON.parse(rawData);
    const key = await importKey(LISTS_KEY, k);

    const lists = await decryptObject(data, key);

    dispatch(reducer.loadLists(lists));
    dispatch(loadItems(lists.map(({ $id }) => $id)));
  } catch (e) {
    dispatch(user.setMasterPassword(e));
  }
};

export const addList = payload => (dispatch, getState) => {
  const $id = generateId();
  dispatch(reducer.addList($id, payload));
  navigate(`/lists/${$id}/edit`, null, true);
  save(getState());
};

export const updateList = ($id, payload) => (dispatch, getState) => {
  dispatch(reducer.updateList($id, payload));
  save(getState());
};

export const deleteList = $id => (dispatch, getState) => {
  dispatch(reducer.deleteList($id));
  save(getState());
};
