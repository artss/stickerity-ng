import { createSelector } from 'reselect';

export const getItemById = createSelector(
  [
    items => items,
    (list, id) => id,
  ],
  (items, id) => items.find(({ $id }) => $id === id)
);