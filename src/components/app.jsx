import React, { Component } from 'react';
import Character from './characters';
import BattleScene from './battle-scene';
import Enemies from './enemy-selection';
import { List, Map } from 'immutable';
import StatusWindow from './status-window';
import TimeOutHandler from './time-out';
import BattleMenuTurn from './battle-menu-turn';
import BattleMenuAttack from './battle-menu-attack';

import '../../sass/style.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <BattleScene>
          <div className="battle-scene-container">
            <Character />
            <Enemies />
            <TimeOutHandler />
          </div>
          <StatusWindow>
            <BattleMenuTurn>
              <BattleMenuAttack />
            </BattleMenuTurn>
          </StatusWindow>
        </BattleScene>
      </div>
    );
  }
}
