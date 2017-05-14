import React, { Component } from 'react';
import dispatch from '../dispatch';

import {
  setMenuAttackSelected,
  setMenuDefendSelected,
  setMenuItemsSelected,
  setMenuMagicSelected,
  setMenuRunSelected,
  setPauseBetweenTurns,
  setListOfTurnOrder,
  setItemSelectedBoolean
} from '../actions/actionCreators';

export default class BattleMenuTurn extends Component {
  handleAttackClick() {
    this.clearOtherMenuSelections();
    dispatch(setMenuAttackSelected(true));
  }

  handleDefendClick() {
    this.clearOtherMenuSelections();
    dispatch(setMenuDefendSelected(true, this.props.getAttackingPosition));
    // dispatch(setNextTurnFromList(this.props.getListOfTurnOrder));
    dispatch(setListOfTurnOrder(this.props.getNextTurn));
    dispatch(setPauseBetweenTurns(true));
  }

  handleMagicClick() {
    this.clearOtherMenuSelections();
    dispatch(setMenuMagicSelected(true));
  }

  handleItemsClick() {
    this.clearOtherMenuSelections();
    dispatch(setMenuItemsSelected(true));
  }

  handleRunClick() {
    this.clearOtherMenuSelections();
    dispatch(setMenuRunSelected(true));
  }

  clearOtherMenuSelections() {
    dispatch(setMenuAttackSelected(false));
    dispatch(setMenuDefendSelected(false, this.props.getAttackingPosition));
    dispatch(setMenuMagicSelected(false));
    dispatch(setMenuItemsSelected(false));
    dispatch(setMenuRunSelected(false));
    dispatch(setItemSelectedBoolean(false));
  }

  render() {
    if (this.props.state.whoIsAttacking.attacker.includes('hero')) {
      return (
        <div className="battle-menu-turn">
          <div>
            <li><button onClick={() => this.handleAttackClick()} className="menu-select" id="attack">Attack</button></li>
            <li><button onClick={() => this.handleDefendClick()} className="menu-select" id="defend">Defend</button></li>
            <li><button onClick={() => this.handleMagicClick()} className="menu-select" id="magic">Magic</button></li>
            <li><button onClick={() => this.handleItemsClick()} className="menu-select" id="items">Items</button></li>
            <li><button onClick={() => this.handleRunClick()} className="menu-select" id="run">RUN!</button></li>
          </div>
          {this.props.children}
        </div>
      );
    }

    return null;

    // return <span style={{ display: 'none' }} />;
  }
}
