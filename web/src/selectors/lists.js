import { createSelector } from 'reselect';

export const getLists = createSelector(
  [lists => lists],
  lists => lists.filter(({ $deleted }) => !$deleted)
);

export const getListById = createSelector(
  [
    lists => lists,
    (lists, id) => id,
  ],
  (lists, id) => lists.find(({ $id }) => $id === id)
);
