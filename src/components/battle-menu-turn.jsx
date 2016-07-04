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
    this.props.getNextTurn === 'hero0' && !this.props.isPauseBetweenTurns && this.props.isHero0Defending ? this.clearOtherMenuSelections() : null;
    this.props.getNextTurn === 'hero1' && !this.props.isPauseBetweenTurns && this.props.isHero1Defending ? this.clearOtherMenuSelections() : null;
    this.props.getNextTurn === 'hero2' && !this.props.isPauseBetweenTurns && this.props.isHero2Defending ? this.clearOtherMenuSelections() : null;
  }

  handleAttackClick() {
    this.clearOtherMenuSelections();
    this.props.setMenuAttackSelected(true);
  }

  handleDefendClick() {
    console.log(this.props.getAttackingPosition);
    this.clearOtherMenuSelections();
    this.props.setMenuDefendSelected(true, this.props.getAttackingPosition);
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
    this.props.setMenuDefendSelected(false, this.props.getAttackingPosition);
    this.props.setMenuMagicSelected(false);
    this.props.setMenuItemsSelected(false);
    this.props.setMenuRunSelected(false);
  }

  render() {
    const INLINE_STYLE = {
      display: 'none'
    };
    const INNER = (
      <div className="battle-menu-turn">
        <div>
          <li><button onClick={this.handleAttackClick} className="menu-select" id="attack">Attack</button></li>
          <li><button onClick={this.handleDefendClick} className="menu-select" id="defend">Defend</button></li>
          <li><button onClick={this.handleMagicClick} className="menu-select" id="magic">Magic</button></li>
          <li><button onClick={this.handleItemsClick} className="menu-select" id="items">Items</button></li>
          <li><button onClick={this.handleRunClick} className="menu-select" id="run">RUN!</button></li>
        </div>
        {this.props.children}
      </div>
    );
    if (this.props.isHero0Attacking && !this.props.isPauseBetweenTurns && !this.props.isHeroAttackingAnimation && this.props.getNextTurn === 'hero0') {
      return INNER;
    } else if (this.props.isHero1Attacking && !this.props.isPauseBetweenTurns && !this.props.isHeroAttackingAnimation && this.props.getNextTurn === 'hero1') {
      return INNER;
    } else if (this.props.isHero2Attacking && !this.props.isPauseBetweenTurns && !this.props.isHeroAttackingAnimation && this.props.getNextTurn === 'hero2') {
      return INNER;
    } else {
      return <span style={INLINE_STYLE} />;
    }
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats');
  // console.log(state.get('getNextTurn').toJS()[0]);
  // console.log(c);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    isHeroTurn: state.get('isHeroAttacking').isHeroAttacking,
    isHero0Attacking: state.get('getNextTurn').toJS()[0] === 'hero0' ? true : false,
    isHero1Attacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHero2Attacking: state.get('getNextTurn').toJS()[0] === 'hero2' ? true : false,
    getAttackingPosition: state.get('getNextTurn').toJS()[0].slice(4),
    isHeroAttackingAnimation: state.get('isEnemyTarget').toJS()[0].attacking || state.get('isEnemyTarget').toJS()[1].attacking,
    getListOfTurnOrder: state.get('getListOfTurnOrder'),
    getNextTurn: state.get('getNextTurn').toJS()[0],
    isHero0Defending: state.get('isMenuDefendSelected').toJS()[0],
    isHero1Defending: state.get('isMenuDefendSelected').toJS()[1],
    isHero2Defending: state.get('isMenuDefendSelected').toJS()[2]
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
    // getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS()[0].targetForAttack,
    // enemyStr: state.get('getEnemySelectedTarget').toJS()[0].enemyStr,
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
