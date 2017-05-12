import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Router from './routes';
import rootReducer from './reducers/rootReducer';
import { initializeDispatch } from './dispatch';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

initializeDispatch(store);

const render = () => {
  ReactDOM.render(
    <div>
      <Router store={store.getState()} />
    </div>
    , document.getElementById('appRender'));
};

render();
store.subscribe(render);
