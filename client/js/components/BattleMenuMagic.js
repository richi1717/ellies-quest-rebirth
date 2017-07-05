import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import types from '../constants/actionTypes';
import dispatch from '../dispatch';

export default class BattleMenuMagic extends Component {
  getRenderedListOfMagicFirstFive(magic) {
    const arr = [];
    let incr = 0;

    magic.map((mgk, id) => {
      incr++;

      if (id < 5) {
        arr.push(
          <li key={incr}>
            <button className="menu-select magic-menu" onClick={() => this.dispatchClickEvent(mgk)}>
              <span>{mgk.name}</span><span>{mgk.cost}MP</span>
            </button>
          </li>
        );
      }
    });

    return arr;
  }

  getRenderedListOfItemsAfterFive(magic) {
    const arr = [];
    let incr = 0;

    magic.map((mgk, id) => {
      incr++;

      if (id > 4) {
        arr.push(
          <li key={incr}>
            <button className="menu-select magic-menu" onClick={() => this.dispatchClickEvent(mgk)}>
              <span>{mgk.name}</span><span>{mgk.cost}MP</span>
            </button>
          </li>
        );
      }
    });

    return arr;
  }

  dispatchClickEvent(magic) {
    dispatch({
      type: types.SET_MAGIC_TYPE,
      magicType: magic
    });
  }

  render() {
    const { characterStats, whoIsAttacking } = this.props.state;
    if (whoIsAttacking.typeOfAttack !== 'magic') return null;
    const hero = characterStats[whoIsAttacking.attacker.split('hero')[1] - 1];
    const CLASSES = {
      'battle-menu-turn': true,
      'menu-magic': true,
      'sub-menu': true,
      'more-than-five': hero.magicAbilities.length > 4
    };

    if (hero.magicAbilities.length < 5) {
      return (
        <div className={classnames(CLASSES)}>
          <div>
            {this.getRenderedListOfMagicFirstFive(hero.magicAbilities)}
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(CLASSES)}>
        <div>
          {this.getRenderedListOfMagicFirstFive(hero.magicAbilities)}
        </div>
        <div>
          {this.getRenderedListOfItemsAfterFive(hero.magicAbilities)}
        </div>
      </div>
    );
  }
}

BattleMenuMagic.propTypes = {
  state: PropTypes.object.isRequired
};
