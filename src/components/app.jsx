import React, { Component } from 'react';
import Character from './characters';
import BattleScene from './battle-scene';
import Enemies from './enemy-selection';
import { List, Map } from 'immutable';

export default class App extends Component {
  render() {
    return (
      <div>
        <BattleScene>
          <Character />
          <Enemies />
        </BattleScene>
      </div>
    );
  }
}
