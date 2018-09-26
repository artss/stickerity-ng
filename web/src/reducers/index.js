import { combineReducers } from 'redux';
import { makeReducers } from '../util/saymyname';

import lists from './lists';
import user from './user';

const reducers = makeReducers({ lists, user });

export default combineReducers(reducers);
