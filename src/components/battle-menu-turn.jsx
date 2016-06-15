import React, { Component } from 'react';
import classnames from 'classnames';
import PureComponent from './pure-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';

import {
  setMenuAttackSelected,
  setMenuDefendSelected,
  setMenuItemsSelected,
  setMenuMagicSelected,
  setMenuRunSelected,
  setPauseBetweenTurns,
  setListOfTurnOrder,
  setNextTurnFromList
} from '../actions/index';

import '../../sass/_menu.scss';

@autobind
class BattleMenuTurn extends PureComponent {
  componentDidUpdate() {
    this.props.getNextTurn === 'hero1' && !this.props.isPauseBetweenTurns && this.props.isMenuDefendSelected ? this.clearOtherMenuSelections() : null;
  }

  handleAttackClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuAttackSelected(true);
  }

  handleDefendClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuDefendSelected(true);
    this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
    this.props.setListOfTurnOrder(this.props.getNextTurn);
    this.props.setPauseBetweenTurns(true);
  }

  handleMagicClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuMagicSelected(true);
  }

  handleItemsClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuItemsSelected(true);
  }

  handleRunClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuRunSelected(true);
  }

  clearOtherMenuSelections() {
    this.props.setMenuAttackSelected(false);
    this.props.setMenuDefendSelected(false);
    this.props.setMenuMagicSelected(false);
    this.props.setMenuItemsSelected(false);
    this.props.setMenuRunSelected(false);
  }

  render() {
    const INLINE_STYLE = {
      display: 'none'
    };
    if (this.props.isHeroAttacking && !this.props.isPauseBetweenTurns && !this.props.isHeroAttackingAnimation && this.props.getNextTurn === 'hero1') {
      return (
        <div className="battle-menu-turn">
          <li>
            <button onClick={this.handleAttackClick} className="menu-select" id="attack">Attack</button>
          </li>
          <li>
            <button onClick={this.handleDefendClick} className="menu-select" id="defend">Defend</button>
          </li>
          <li>
            <button onClick={this.handleMagicClick} className="menu-select" id="magic">Magic</button>
          </li>
          <li>
            <button onClick={this.handleItemsClick} className="menu-select" id="items">Items</button>
          </li>
          <li>
            <button onClick={this.handleRunClick} className="menu-select" id="run">RUN!</button>
          </li>
          {this.props.children}
        </div>
      );
    } else {
      return <span style={INLINE_STYLE} />;
    }
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats');
  // console.log(c);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    isHeroTurn: state.get('isHeroAttacking').isHeroAttacking,
    isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHeroAttackingAnimation: state.get('isEnemyTarget').toJS()[0].attacking || state.get('isEnemyTarget').toJS()[1].attacking,
    getListOfTurnOrder: state.get('getListOfTurnOrder'),
    getNextTurn: state.get('getNextTurn').toJS()[0],
    isMenuDefendSelected: state.get('isMenuDefendSelected').toJS()[0]
    // heroMaxHp: C.get('maxHp'),
    // heroCurrentHp: C.get('currentHp'),
    // heroMaxMp: C.get('maxMp'),
    // heroCurrentMp: C.get('currentMp'),
    // heroAgility: C.get('agility'),
    // accuracy: C.get('accuracy'),
    // heroStr: C.get('str'),
    // magic: C.get('magic'),
    // exp: C.get('exp'),
    // heroDef: C.get('def'),
    // evade: C.get('evade'),
    // name: C.get('name'),
    // classes: C.get('classes'),
    // refName: C.get('refName'),
    // getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS().targetForAttack,
    // enemyStr: state.get('getEnemySelectedTarget').toJS().enemyStr,
    // numberTest: 1,
    // heroStats: C,
    //                        || state.get('isEnemyTarget').toJS()[2].attacking || state.get('isEnemyTarget').toJS()[3].attacking
    //                        || state.get('isEnemyTarget').toJS()[4].attacking ? true : false,
    // isEnemyAttacking: state.get('isEnemyAttacking').toJS()[0],
    // isEnemyTarget0: state.get('isEnemyTarget').toJS()[0].attacking,
    // isEnemyTarget1: state.get('isEnemyTarget').toJS()[1].attacking,
    // isEnemyTarget2: state.get('isEnemyTarget').toJS()[2].attacking,
    // isEnemyTarget3: state.get('isEnemyTarget').toJS()[3].attacking,
    // isEnemyTarget4: state.get('isEnemyTarget').toJS()[4].attacking,
    // // isHeroAttackingPos2: state.get('isHeroAttacking').isHeroAttackingPos2,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setMenuAttackSelected,
    setMenuDefendSelected,
    setMenuItemsSelected,
    setMenuMagicSelected,
    setMenuRunSelected,
    setPauseBetweenTurns,
    setListOfTurnOrder,
    setNextTurnFromList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleMenuTurn);
