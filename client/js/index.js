import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import filter from 'lodash.filter';
import Router from './routes';
import rootReducer from './reducers/rootReducer';
import dispatch, { initializeDispatch } from './dispatch';
import { DATA_BASE_URL_CHARACTERS } from './constants/databaseUrls';
import types from './constants/actionTypes';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

initializeDispatch(store);

function setCharacters(characters) {
  const playableCharacters = filter(characters, { inPlay: true });

  playableCharacters.map((character, id) => {
    dispatch({
      type: types.UPDATE_CHARACTER_STATS,
      character,
      id
    });
  });
}

fetch(DATA_BASE_URL_CHARACTERS)
  .then(response => response.json())
  .then(data => {
    setCharacters(data);
  });


const render = () => {
  ReactDOM.render(
    <div>
      <Router store={store.getState()} />
    </div>
    , document.getElementById('appRender'));
};

render();
store.subscribe(render);
