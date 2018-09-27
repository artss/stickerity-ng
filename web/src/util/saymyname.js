const PREFIX = 'saymyname';
const DELIMITER = '.';

const initialStateSymbol = Symbol('initialState');
const run = Symbol('run');

function action(fn, type) {
  return (...args) => {
    if (args[0] === run) {
      return fn(...args.slice(1));
    }

    return { type, args };
  };
}

function identify(reducers, path = [], delimiter) {
  Object.keys(reducers).forEach((key) => {
    const itemPath = [...path, key];
    const itemPathString = itemPath.join(delimiter || DELIMITER);
    let item = reducers[key];

    if (typeof item === 'function') {
      item = action(item, itemPathString);
      item.toString = () => itemPathString;

      /* eslint-disable no-param-reassign */
      reducers[key] = item;
      reducers[Symbol.for(itemPathString)] = item;
      /* eslint-enable no-param-reassign */
    } else if (typeof item === 'object') {
      identify(item, itemPath, delimiter);
    }
  });

  return reducers;
}

export function saymyname(reducers, initialState, prefix, delimiter) {
  return {
    ...identify(reducers, [prefix || PREFIX], delimiter),
    [initialStateSymbol]: initialState,
  };
}

export function makeReducers(reducers) {
  return Object.keys(reducers).reduce(
    (memo, key) => ({
      ...memo,
      [key]: (state = reducers[key][initialStateSymbol], { type, args }) => {
        const reducer = reducers[key][Symbol.for(type)];
        return reducer
          ? reducer.call(null, run, state, ...args)
          : state;
      },
    }),
    {}
  );
}
