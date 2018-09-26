const DELIMITER = '.';

const symbol = Symbol('initialState');

function partial(fn) {
  return (...args) => {
    if (args.length < 2) {
      return () => ({ type: fn, payload: args[0] });
    }
    return fn(...args);
  };
}

export function identify(obj, prefix = [], delimiter) {
  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    const itemPrefix = [...prefix, key];
    const itemPrefixString = itemPrefix.join(delimiter || DELIMITER);

    if (typeof item === 'function') {
      /* eslint-disable no-param-reassign */
      obj[key] = partial(item);
      obj[key].toString = () => itemPrefixString;
      /* eslint-enable no-param-reassign */
    } else if (typeof item === 'object') {
      identify(item, itemPrefix, delimiter);
    }
  });

  return obj;
}

export function saymyname(reducers, initialState, prefix, delimiter) {
  return {
    ...identify(reducers, [prefix || 'saymyname'], delimiter),
    [symbol]: initialState,
  };
}

export function makeReducers(reducers) {
  global.reducers = reducers;
  return Object.keys(reducers).reduce(
    (memo, key) => ({
      ...memo,
      [key]: (state = reducers[key][symbol], action, ...args) => {
        const reducer = reducers[action.toString()];
        return reducer
          ? reducer(state, ...args)
          : state;
      },
    }),
    {}
  );
}
