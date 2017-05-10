import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import Router from './routes';
import rootReducer from './reducers/rootReducer';
import { initializeDispatch } from './dispatch';

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxPromise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

initializeDispatch(store);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('appRender'));
