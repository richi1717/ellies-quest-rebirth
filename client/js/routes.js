import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

export default function Router(props) {
  const { store } = props;
  const isMusicOn = store.isBackgroundMusicOn.data;

  return (
    <BrowserRouter>
      <div>
        <Route
          exact path="/"
          render={() => (
            <App battleScene="forest" playMusic={isMusicOn} state={store} />
          )}
        />
        <Route
          path="/forest"
          render={() => (
            <App battleScene="forest" playMusic={isMusicOn} state={store} />
          )}
        />
        <Route
          path="/desert"
          render={() => (
            <App battleScene="desert" playMusic={isMusicOn} state={store} />
          )}
        />
        <Route
          path="/grass"
          render={() => (
            <App battleScene="grass" playMusic={isMusicOn} state={store} />
          )}
        />
        <Route
          path="/boss"
          render={() => (
            <App battleScene="boss" playMusic={isMusicOn} state={store} />
          )}
        />
        <Route
          path="/beach"
          render={() => (
            <App battleScene="beach" playMusic={isMusicOn} state={store} />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

Router.propTypes = {
  store: PropTypes.object.isRequired
};

