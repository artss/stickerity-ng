/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { hot } from 'react-hot-loader';

import getHistory from './util/history';

// must be imported before all components
import './index.css';

import App from './components/App';

// TODO: real reducers and initialState
const initialState = {
  lists: [
    {
      $id: '1',
      $type: 'Note',
      title: 'Brand new skickerity test long title',
      color: 'fff',
      items: [
        {
          $id: '1',
          title: 'End-to-end encryption',
          text: 'I don\'t know how will it work, but it will',
        },
      ],
    },

    {
      $id: '2',
      $type: 'Password',
      title: 'Passwords',
      color: 'fea',
      items: [
        {
          $id: '1',
          title: 'point',
          icon: 'https://i.point.im/icon-128.png',
          url: 'point.im',
          login: 'chubaka',
          password: 'qwe',
        },

        {
          $id: '2',
          title: 'VK',
          icon: '',
          url: 'vk.com',
          login: 'geegoorda',
          password: 'huipizda',
        },

        {
          $id: '3',
          title: 'facebook',
          icon: '',
          url: 'facebook.com',
          login: 'nikitaG',
          password: 'ya_normalny',
        },
      ],
    },

    {
      $id: '3',
      $type: 'Checklist',
      title: 'To buy',
      color: 'dfe',
      items: [
        {
          $id: '1',
          text: 'Bread',
          checked: true,
        },

        {
          $id: '2',
          text: 'Milk',
          checked: false,
        },

        {
          $id: '3',
          text: 'Potatoes',
          checked: false,
        },

        {
          $id: '4',
          text: 'Tomatoes',
          checked: false,
        },
      ],
    },
  ],
  DEBUG: true,
};
const reducers = (state = initialState) => state;

document.addEventListener('DOMContentLoaded', () => {
  const history = getHistory();
  const routerWithHistory = routerMiddleware(history);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && initialState.DEBUG
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(routerWithHistory, thunk))
  );

  const AppContainer = module.hot
    ? hot(module)(App)
    : App;

  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
