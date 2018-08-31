import { createSelector } from 'reselect';

export const getListById = createSelector(
  [
    state => state.lists,
    (state, id) => id
  ],
  (lists, id) => lists.find(({ $id }) => $id === id)
);
