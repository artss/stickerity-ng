import { combineReducers } from 'redux';

import user from './user';
import lists from './lists';

const DELIMITER = '.';

function identify(obj, prefix = []) {
  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    const itemPrefix = [...prefix, key];
    const itemPrefixString = itemPrefix.join(DELIMITER);

    if (typeof item === 'function') {
      item.toString = () => itemPrefixString;
    } else if (typeof item === 'object') {
      identify(item, itemPrefix);
    }
  });
}

function makeReducers(obj) {
  identify(obj);

  return Object.keys(obj).reduce(
    (memo, key) => ({
      ...memo,
      [key]: (state = {}, action, ...args) => {
        const reducer = obj[action.toString()];
        return reducer
          ? reducer(state, ...args)
          : state;
      },
    }),
    {}
  );
}

const reducers = makeReducers({
  user,
  lists,
});

export default combineReducers(reducers);
