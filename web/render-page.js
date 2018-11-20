/* eslint-disable import/no-extraneous-dependencies */

require('@babel/register')({
  cache: false,
});

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

const React = require('react');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const { createStore, applyMiddleware } = require('redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const reducers = require('./src/reducers').default;
const Routes = require('./src/routes').default;

const storeEnhancer = applyMiddleware(thunk);

function renderReact(state) {
  const store = createStore(reducers, state, storeEnhancer);
  const component = React.createElement(
    StaticRouter,
    state.router,
    React.createElement(Routes)
  );

  const content = renderToString(React.createElement(Provider, { store }, component));

  return content;
}

module.exports = (pathname) => {
  const state = {
    router: {
      location: { pathname },
    },
  };

  return renderReact(state);
};
