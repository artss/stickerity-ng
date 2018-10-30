import reducer from '../reducers/items';
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

const ITEMS_KEY = 'ITEMS';

async function save($listId, { items }) {
  const itemsKey = `${ITEMS_KEY}${$listId}`;

  let key = getKey(itemsKey);

  if (!key) {
    key = await generateKey(itemsKey);
  }

  const k = await exportKey(itemsKey);
  const data = await encryptObject(items[$listId], key);

  localStorage.setItem(itemsKey, JSON.stringify({ k, data }));
}

export const loadItems = ids => async (dispatch) => {
  const items = {};

  await Promise.all(ids.map(async ($id) => {
    const itemsKey = `${ITEMS_KEY}${$id}`;

    const rawData = localStorage.getItem(itemsKey);

    if (!rawData) {
      return;
    }

    const { k, data } = JSON.parse(rawData);
    const key = await importKey(itemsKey, k);

    items[$id] = await decryptObject(data, key);
  }));

  dispatch(reducer.loadItems(items));
};

export const addItem = ($listId, payload, follow) => (dispatch, getState) => {
  const $id = generateId();
  dispatch(reducer.addItem($listId, $id, payload));

  if (follow) {
    navigate(`/lists/${$listId}/${$id}`, null, true);
  }

  save($listId, getState());
};

export const updateItem = ($listId, $id, payload) => (dispatch, getState) => {
  dispatch(reducer.updateItem($listId, $id, payload));
  save($listId, getState());
};

export const deleteItem = ($listId, $id) => (dispatch, getState) => {
  dispatch(reducer.deleteItem($listId, $id));
  save($listId, getState());
};

export const sortItems = ($listId, ids) => reducer.sortItems($listId, ids);
