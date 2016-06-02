import React, { Component } from 'react';
import Character from './characters';
import BattleScene from './battle-scene';
import Enemies from './enemy-selection';
import { List, Map } from 'immutable';
import StatusWindow from './status-window';

import '../../sass/style.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <BattleScene>
          <div className="battle-scene-container">
            <Character />
            <Enemies />
          </div>
          <StatusWindow />
        </BattleScene>
      </div>
    );
  }
}
