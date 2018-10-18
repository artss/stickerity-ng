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
          // eslint-disable-next-line
          text: {"blocks":[{"key":"dblal","text":"Придумать, как шифровать","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},
        },

        {
          $id: '2',
          // eslint-disable-next-line
          text: {"blocks":[{"key":"cnb63","text":"Придумать лого","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},
        },

        {
          $id: '3',
          title: 'Material palette generator',
          // eslint-disable-next-line
          text: {"blocks":[{"key":"87l8k","text":"The Material palette generator can be used to generate a palette for any color you input. An algorithmic adjustment of hue, chroma, and lightness creates palettes that are both usable and aesthetically pleasing.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6qcp3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"en81n","text":"## Input colors","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5chif","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b804s","text":"Color palettes can be generated based on the primary input color, and whether the desired palette should be analogous, complementary, or triadic in relation to the primary color. Alternatively, the tool can generate expanded palettes for any primary and secondary color input.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bk15i","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a53vk","text":"## Color variations for accessibility","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c7mlb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d4ju","text":"These palettes provide additional ways to use your primary and secondary colors, by providing lighter and darker options to separate surfaces and provide colors that meet accessibility standards.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},
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
      $type: 'Event',
      title: 'Events',
      items: [
        {
          $id: '1',
          type: 2,
          title: 'Nikita Geegoordah',
          year: 1961,
          month: 3,
          day: 27,
          annual: true,
          wholeDay: true,
        },

        {
          $id: '2',
          type: 2,
          title: 'Ivan Petrov',
          year: 1980,
          month: 9,
          day: 24,
          annual: true,
          wholeDay: true,
        },

        {
          $id: '3',
          type: 1,
          title: '3th sept (song)',
          year: 1993,
          month: 9,
          day: 3,
          annual: true,
          wholeDay: true,
        },

        {
          $id: '4',
          type: 2,
          title: 'Mika',
          year: 1988,
          month: 10,
          day: 3,
          annual: true,
          wholeDay: true,
        },

        {
          $id: '5',
          type: 5,
          title: 'Future',
          description: 'Should not display in 2018',
          year: 2019,
          month: 10,
          day: 3,
          hour: 11,
          min: 0,
        },

        {
          $id: '6',
          type: 5,
          title: 'Проснуться',
          description: 'Нахуй будильники',
          year: 2018,
          month: 10,
          day: 7,
          hour: 6,
          min: 30,
        },

        {
          $id: '7',
          type: 5,
          title: 'Посрать',
          year: 2018,
          month: 10,
          day: 7,
          hour: 6,
          min: 50,
        },

        {
          $id: '8',
          type: 5,
          title: 'Покурить',
          year: 2018,
          month: 10,
          day: 7,
          hour: 6,
          min: 40,
        },

        {
          $id: '9',
          type: 3,
          title: 'Автошкола',
          description: 'Последнее занятие',
          year: 2018,
          month: 10,
          day: 7,
          hour: 10,
          min: 0,
        },

        {
          $id: '10',
          type: 4,
          title: 'Поездка на маршрутке номер сто девяносто три',
          year: 2018,
          month: 10,
          day: 7,
          hour: 9,
          min: 30,
        },
      ],
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
