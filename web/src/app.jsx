/* eslint-disable no-underscore-dangle */

import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { hot } from 'react-hot-loader';

import { loadUser } from './actions/user';
import reducers from './reducers';
import getHistory from './util/history';

// must be imported before all components
import './app.css';

import App from './components/App';

const initialState = {};

document.addEventListener('DOMContentLoaded', () => {
  const history = getHistory();
  const routerWithHistory = routerMiddleware(history);

  const composeEnhancers = NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(routerWithHistory, thunk))
  );

  store.dispatch(loadUser());

  const AppContainer = module.hot
    ? hot(module)(App)
    : App;

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
