import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import App from './components/App';

function BattleForest() {
  return <App battleScene="forest" playMusic={false} />;
}

function BattleDesert() {
  return <App battleScene="desert" />;
}

function BattleGrass() {
  return <App battleScene="grass" />;
}

function BattleBoss() {
  return <App battleScene="boss" />;
}

function BattleBeach() {
  return <App battleScene="beach" />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={BattleForest} />
        <Route path="/forest" component={BattleForest} />
        <Route path="/desert" component={BattleDesert} />
        <Route path="/grass" component={BattleGrass} />
        <Route path="/boss" component={BattleBoss} />
        <Route path="/beach" component={BattleBeach} />
      </div>
    </BrowserRouter>
  );
}
