import React, { Component } from 'react';
import dispatch from '../dispatch';
import types from '../constants/actionTypes';

export default class BattleMenuTurn extends Component {
  constructor() {
    super();

    const setMenuAction = (selection) => () => {
      dispatch({
        type: types.SET_BATTLE_MENU_ACTION,
        selection,
        hero: this.props.state.whoIsAttacking.attacker
      });
    };

    this.attackClick = setMenuAction('attack');
    this.defendClick = setMenuAction('defend');
    this.magicClick = setMenuAction('magic');
    this.itemsClick = setMenuAction('items');
    this.runClick = setMenuAction('run');
  }

  render() {
    const { attacker } = this.props.state.whoIsAttacking;
    if (attacker.includes('hero')) {
      return (
        <div className="battle-menu-turn">
          <div>
            <li><button onClick={this.attackClick} className="menu-select" id="attack">Attack</button></li>
            <li><button onClick={this.defendClick} className="menu-select" id="defend">Defend</button></li>
            <li><button onClick={this.magicClick} className="menu-select" id="magic">Magic</button></li>
            <li><button onClick={this.itemsClick} className="menu-select" id="items">Items</button></li>
            <li><button onClick={this.runClick} className="menu-select" id="run">RUN!</button></li>
          </div>
          {this.props.children}
        </div>
      );
    }

    return null;
  }
}
