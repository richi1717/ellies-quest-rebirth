import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import App from './components/App';

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={() => <App battleScene="forest" playMusic={false} />} />
        <Route path="/forest" render={() => <App battleScene="forest" playMusic={false} />} />
        <Route path="/desert" render={() => <App battleScene="desert" playMusic={false} />} />
        <Route path="/grass" render={() => <App battleScene="grass" playMusic={false} />} />
        <Route path="/boss" render={() => <App battleScene="boss" playMusic={false} />} />
        <Route path="/beach" render={() => <App battleScene="beach" playMusic />} />
      </div>
    </BrowserRouter>
  );
}
