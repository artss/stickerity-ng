import { createSelector } from 'reselect';

export const getListById = createSelector(
  [
    lists => lists,
    (lists, id) => id,
  ],
  (lists, id) => lists.find(({ $id }) => $id === id)
);

export const getItemById = createSelector(
  [
    list => list,
    (list, id) => id,
  ],
  (list, id) => list.items.find(({ $id }) => $id === id)
);
