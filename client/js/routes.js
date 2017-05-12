import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

export default function Router(props) {
  return (
    <BrowserRouter>
      <div>
        <Route
          exact path="/"
          render={() => (
            <App battleScene="forest" playMusic={false} {...props.store} />
          )}
        />
        <Route
          path="/forest"
          render={() => (
            <App battleScene="forest" playMusic={false} {...props.store} />
          )}
        />
        <Route
          path="/desert"
          render={() => (
            <App battleScene="desert" playMusic={false} {...props.store} />
          )}
        />
        <Route
          path="/grass"
          render={() => (
            <App battleScene="grass" playMusic={false} {...props.store} />
          )}
        />
        <Route
          path="/boss"
          render={() => (
            <App battleScene="boss" playMusic={false} {...props.store} />
          )}
        />
        <Route
          path="/beach"
          render={() => (
            <App battleScene="beach" playMusic {...props.store} />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

Router.propTypes = {
  store: PropTypes.object.isRequired
};

