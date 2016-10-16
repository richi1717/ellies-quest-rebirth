import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import Character from '../components/character';

import {
  setBattleScene,
  setEnemySelectedTarget,
  setPauseBetweenTurns,
  setNextTurnFromList,
  setListOfTurnOrder,
  setEnemyAttacking,
  updateCharacterStats,
  removeHeroFromList,
  setItemSelectedBoolean,
  setItemObjectFromSelection,
  setMenuItemsSelected,
  setHeroAttacking,
  setHeroToEnemyTarget,
  ROOT_URL
} from '../actions/index';

function mapStateToProps(state) {
  return {
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS()[0].targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS()[0].enemyStr,
    hero0Stats: state.get('updateCharacterStats').get('0'),
    hero1Stats: state.get('updateCharacterStats').get('1'),
    hero2Stats: state.get('updateCharacterStats').get('2'),
    isHero0Defending: state.get('isMenuDefendSelected').toJS()[0],
    isHero1Defending: state.get('isMenuDefendSelected').toJS()[1],
    isHero2Defending: state.get('isMenuDefendSelected').toJS()[2],
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    isHero0Turn: state.get('isHeroAttacking').toJS()[0].isHeroAttacking,
    isHero1Turn: state.get('isHeroAttacking').toJS()[1].isHeroAttacking,
    isHero2Turn: state.get('isHeroAttacking').toJS()[2].isHeroAttacking,
    enemyStats: state.get('enemyStats').toArray(),
    isHero0Attacking: state.get('getNextTurn').toJS()[0] === 'hero0' ? true : false,
    isHero1Attacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHero2Attacking: state.get('getNextTurn').toJS()[0] === 'hero2' ? true : false,
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
    isHero0Dead: state.get('updateCharacterStats').toJS()[0] && state.get('updateCharacterStats').toJS()[0].killed,
    isHero1Dead: state.get('updateCharacterStats').toJS()[1] && state.get('updateCharacterStats').toJS()[1].killed,
    isHero2Dead: state.get('updateCharacterStats').toJS()[2] && state.get('updateCharacterStats').toJS()[2].killed,
    getItemObject: state.get('getItemObject').toJS()[0],
    isItemSelected: state.get('isItemSelected').toJS()[0]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setBattleScene,
    setEnemySelectedTarget,
    setPauseBetweenTurns,
    setNextTurnFromList,
    setListOfTurnOrder,
    setEnemyAttacking,
    updateCharacterStats,
    removeHeroFromList,
    setHeroAttacking,
    setItemSelectedBoolean,
    setItemObjectFromSelection,
    setMenuItemsSelected,
    setHeroToEnemyTarget
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
