import { createSelector } from 'reselect';

export const getPlainText = createSelector(
  [content => content],
  content => content.blocks.map(({ text }) => text).join(' ')
);
