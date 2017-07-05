import React, { Component, PropTypes } from 'react';
import dispatch from '../dispatch';
import types from '../constants/actionTypes';

export default class BattleMenuTurn extends Component {
  constructor(props) {
    super(props);

    const setMenuAction = (selection) => (attacker, target) => {
      dispatch({
        type: types.SET_BATTLE_MENU_ACTION,
        selection
      });
      dispatch({
        type: types.SET_ATTACKER_AND_TARGET,
        attacker,
        target,
        typeOfAttack: selection
      });
    };

    this.attackClick = setMenuAction('attack');
    this.magicClick = setMenuAction('magic');
    this.itemsClick = setMenuAction('items');
    this.runClick = setMenuAction('run');
  }

  render() {
    const { whoIsAttacking, characterStats } = this.props.state;
    const { attacker, target } = whoIsAttacking;
    if (attacker.includes('hero')) {
      const heroStats = characterStats[attacker.split('hero')[1] - 1];
      const canUseMagic = heroStats.magicAbilities;
      return (
        <div className="battle-menu-turn">
          <div>
            <li><button onClick={() => this.attackClick(attacker, target)} className="menu-select">Attack</button></li>
            <li>
              <button
                className="menu-select"
                onClick={() => {
                  heroStats.defending = true;
                  dispatch({
                    type: types.UPDATE_CHARACTER_STATS,
                    character: heroStats,
                    id: heroStats.id
                  });
                }}
              >Defend</button>
            </li>
            <li>
              <button
                onClick={() => canUseMagic && this.magicClick(attacker, target)}
                className={`menu-select ${canUseMagic ? '' : 'cannot'}`}
              >
                Magic
              </button>
            </li>
            <li><button onClick={() => this.itemsClick(attacker, target)} className="menu-select">Items</button></li>
            <li><button onClick={() => this.runClick(attacker, target)} className="menu-select">RUN!</button></li>
          </div>
        </div>
      );
    }

    return null;
  }
}

BattleMenuTurn.propTypes = {
  state: PropTypes.object.isRequired
};

