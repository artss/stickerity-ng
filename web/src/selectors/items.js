import { createSelector } from 'reselect';

export const getItems = createSelector(
  [items => items],
  items => (items ? items.filter(({ $deleted }) => !$deleted) : [])
);

export const getItemById = createSelector(
  [
    items => items,
    (list, id) => id,
  ],
  (items, id) => items.find(({ $id }) => $id === id)
);
