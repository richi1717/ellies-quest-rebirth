import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { autobind } from 'core-decorators';
// import axios from 'axios';
import { setMenuAttackSelected } from '../actions/index';
import classnames from 'classnames';
import PureComponent from './pure-component';

import '../../sass/_menu.scss';

@autobind
class BattleMenuAttack extends PureComponent {
  getRenderedListOfItemsFirstFive() {
    const ARR = [];
    for (const KEY in this.props.items) {
      const CLICK = "handleItem" + KEY + "Click";
      /* eslint-disable */
      if (KEY < 5) {
        ARR.push(
          <li key={KEY}>
            <button className="menu-select">
              {this.props.items[KEY]}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  }

  getRenderedListOfItemsAfterFive() {
    const ARR = [];
    for (const KEY in this.props.items) {
      const CLICK = "handleItem" + KEY + "Click";
      /* eslint-disable */
      if (KEY > 4) {
        ARR.push(
          <li key={KEY}>
            <button className="menu-select">
              {this.props.items[KEY]}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  }

  render() {
    const CLASSES = {
      'battle-menu-turn': true,
      'menu-items': true,
      'sub-menu': true,
      'more-than-five': this.props.items.length > 4 ? true : false
    };
    const INLINE_STYLE = {
      display: 'none'
    };
    if (this.props.isMenuItemsSelected) {
      if (this.props.items.length < 5) {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfItemsFirstFive()}
            </div>
          </div>
        );
      } else {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfItemsFirstFive()}
            </div>
            <div>
              {this.getRenderedListOfItemsAfterFive()}
            </div>
          </div>
        );
      }
    } else {
      return <span style={INLINE_STYLE} />;
    }
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats').toJS()[0];
  // console.log(c);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    heroMaxHp: C.maxHp,
    heroCurrentHp: C.currentHp,
    heroMaxMp: C.maxMp,
    heroCurrentMp: C.currentMp,
    heroAgility: C.agility,
    items: C.items,
    accuracy: C.accuracy,
    heroStr: C.str,
    magic: C.magic,
    exp: C.exp,
    heroDef: C.def,
    evade: C.evade,
    heroName0: C.name,
    classes: C.classes,
    refName: C.refName,
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS().targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS().enemyStr,
    numberTest: 1,
    heroStats: state.get('updateCharacterStats').toJS(),
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    isHeroTurn: state.get('isHeroAttacking').isHeroAttacking,
    isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHeroAttackingAnimation: state.get('isEnemyTarget').toJS()[0].attacking || state.get('isEnemyTarget').toJS()[1].attacking
                           || state.get('isEnemyTarget').toJS()[2].attacking || state.get('isEnemyTarget').toJS()[3].attacking
                           || state.get('isEnemyTarget').toJS()[4].attacking ? true : false,
    isEnemyAttacking: state.get('isEnemyAttacking').toJS()[0],
    isEnemyTarget0: state.get('isEnemyTarget').toJS()[0].attacking,
    isEnemyTarget1: state.get('isEnemyTarget').toJS()[1].attacking,
    isEnemyTarget2: state.get('isEnemyTarget').toJS()[2].attacking,
    isEnemyTarget3: state.get('isEnemyTarget').toJS()[3].attacking,
    isEnemyTarget4: state.get('isEnemyTarget').toJS()[4].attacking,
    // isHeroAttackingPos2: state.get('isHeroAttacking').isHeroAttackingPos2,
    getListOfTurnOrder: state.get('getListOfTurnOrder'),
    getNextTurn: state.get('getNextTurn').toJS()[0],
    enemyStats: state.get('enemyStats').toJS(),
    amountOfEnemies: state.get('enemyStats').toArray().length,
    isMenuItemsSelected: state.get('isMenuItemsSelected').toJS()[0]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMenuAttackSelected }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleMenuAttack);
