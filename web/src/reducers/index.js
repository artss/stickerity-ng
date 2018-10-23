import { combineReducers } from 'redux';
import { makeReducers } from 'redux-callable';

import lists from './lists';
import items from './items';
import user from './user';

const reducers = makeReducers({
  lists,
  items,
  user,
});

export default combineReducers(reducers);
