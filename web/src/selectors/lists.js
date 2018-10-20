import { createSelector } from 'reselect';

export const getListById = createSelector(
  [
    lists => lists,
    (lists, id) => id,
  ],
  (lists, id) => lists.find(({ $id }) => $id === id)
);