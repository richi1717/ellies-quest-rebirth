import React, { Component } from 'react';
import Character from '../containers/character-selection-container';
import BattleScene from './battle-scene';
import Enemies from './enemy-selection';
import { List, Map } from 'immutable';
import StatusWindow from './status-window';
import TimeOutHandler from './time-out';
import BattleMenuTurn from './battle-menu-turn';
import BattleMenuAttack from './battle-menu-attack';
import BattleMenuItems from './battle-menu-items';

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
              <BattleMenuItems />
            </BattleMenuTurn>
          </StatusWindow>
        </BattleScene>
      </div>
    );
  }
}
