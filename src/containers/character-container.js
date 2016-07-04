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
    // classes: state.get('updateCharacterStats').toJS()[0].classes,
    refName: state.get('updateCharacterStats').toJS()[0].refName,
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
