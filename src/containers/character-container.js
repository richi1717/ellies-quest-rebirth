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
  setHeroAttacking,
  ROOT_URL
} from '../actions/index';

function mapStateToProps(state) {
  return {
    heroMaxHp: state.get('updateCharacterStats').toJS()[0].maxHp,
    heroCurrentHp: state.get('updateCharacterStats').toJS()[0].currentHp,
    heroMaxMp: state.get('updateCharacterStats').toJS()[0].maxMp,
    heroCurrentMp: state.get('updateCharacterStats').toJS()[0].currentMp,
    heroAgility: state.get('updateCharacterStats').toJS()[0].agility,
    accuracy: state.get('updateCharacterStats').toJS()[0].accuracy,
    heroStr: state.get('updateCharacterStats').toJS()[0].str,
    magic: state.get('updateCharacterStats').toJS()[0].magic,
    exp: state.get('updateCharacterStats').toJS()[0].exp,
    heroDef: state.get('updateCharacterStats').toJS()[0].def,
    evade: state.get('updateCharacterStats').toJS()[0].evade,
    name: state.get('updateCharacterStats').toJS()[0].name,
    classes: state.get('updateCharacterStats').toJS()[0].classes,
    refName: state.get('updateCharacterStats').toJS()[0].refName,
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS().targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS().enemyStr,
    heroStats: state.get('updateCharacterStats').get('0'),
    isMenuDefendSelected: state.get('isMenuDefendSelected').toJS()[0],
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    isHeroTurn: state.get('isHeroAttacking').isHeroAttacking,
    enemyStats: state.get('enemyStats').toArray(),
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
    isHeroDead: state.get('updateCharacterStats').toJS()[0].currentHp <= 0 ? true : false
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
    setHeroAttacking
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
