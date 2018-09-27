/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { hot } from 'react-hot-loader';

import reducers from './reducers';
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
          text: 'Придумать, как шифровать',
        },

        {
          $id: '2',
          text: 'Придумать лого',
        },

        {
          $id: '3',
          title: 'Material palette generator',
          text: 'The Material palette generator can be used to generate a palette for any color you input. An algorithmic adjustment of hue, chroma, and lightness creates palettes that are both usable and aesthetically pleasing.\n\n## Input colors\n\nColor palettes can be generated based on the primary input color, and whether the desired palette should be analogous, complementary, or triadic in relation to the primary color. Alternatively, the tool can generate expanded palettes for any primary and secondary color input.\n\n## Color variations for accessibility\n\nThese palettes provide additional ways to use your primary and secondary colors, by providing lighter and darker options to separate surfaces and provide colors that meet accessibility standards.',
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

    {
      $id: '4',
      $type: 'Note',
      title: 'Empty',
      items: [],
    },
  ],

  user: {},
};

document.addEventListener('DOMContentLoaded', () => {
  const history = getHistory();
  const routerWithHistory = routerMiddleware(history);

  const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
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

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
