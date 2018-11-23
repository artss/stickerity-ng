import reducer from '../reducers/items';
import { generateId } from '../util/id';
import { navigate } from '../util/history';
import { omit } from '../util/objects';
import { getTime } from '../util/time';
import {
  load,
  unload,
  save,
  del,
} from '../util/sync';

const KEY = 'ITEMS';
const ENDPOINT = 'items';

export async function saveItems($listId, { items }) {
  const itemsKey = `${KEY}${$listId}`;
  const itemsEndpoint = `${ENDPOINT}/${$listId}`;

  await save(items[$listId], itemsKey, itemsEndpoint);
}

export const loadItems = ids => async (dispatch) => {
  const items = {};

  await Promise.all(ids.map(async ($listId) => {
    const itemsKey = `${KEY}${$listId}`;
    const itemsEndpoint = `${ENDPOINT}/${$listId}`;

    items[$listId] = await load(itemsKey, itemsEndpoint);
  }));

  dispatch(reducer.loadItems(items));
};

export const unloadItems = ids => (dispatch, getState) => {
  const { items } = getState();

  ids.forEach(($listId) => {
    const itemsKey = `${KEY}${$listId}`;
    unload(itemsKey);
  });

  dispatch(reducer.loadItems(omit(items, ids)));
};

export const addItem = ($listId, payload, follow) => (dispatch, getState) => {
  const $id = generateId();
  dispatch(reducer.addItem($listId, $id, getTime(), payload));

  if (follow) {
    navigate(`/lists/${$listId}/${$id}`, null, true);
  }

  saveItems($listId, getState());
};

export const updateItem = ($listId, $id, payload) => (dispatch, getState) => {
  dispatch(reducer.updateItem($listId, $id, getTime(), payload));
  saveItems($listId, getState());
};

export const deleteItem = ($listId, $id) => (dispatch, getState) => {
  dispatch(reducer.deleteItem($listId, $id, getTime()));
  saveItems($listId, getState());
};

export const deleteItems = $listId => () => {
  const itemsKey = `${KEY}${$listId}`;
  const itemsEndpoint = `${ENDPOINT}/${$listId}`;
  del(itemsKey, itemsEndpoint);
};

export const sortItems = ($listId, ids) => reducer.sortItems($listId, ids);
