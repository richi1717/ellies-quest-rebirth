import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Enemy from '../components/Enemy';

import {
  fetchEnemies,
  setBattleScene,
  setPauseBetweenTurns,
  setListOfTurnOrder,
  setNextTurnFromList,
  setHeroAttackingPos2,
  setEnemySelectedTarget,
  setHeroToEnemyTarget,
  setEnemyAttacking,
  updateEnemyStats,
  updateEnemyStatsFromAttack,
  setMenuAttackSelected,
  removeEnemyFromList,
  deleteEnemyWhenKilled,
  setHeroAttacking
} from '../actions/actionCreators';

function mapStateToProps(state) {
  // console.log(state.get('enemyStats'));
  return {
    isEnemyAttacking: state.get('isEnemyAttacking').toJS()[0],
    // isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHero0Attacking: state.get('isHeroAttacking').toJS()[0].isHeroAttacking,
    isHero1Attacking: state.get('isHeroAttacking').toJS()[1].isHeroAttacking,
    isHero2Attacking: state.get('isHeroAttacking').toJS()[2].isHeroAttacking,
    heroStr: state.get('updateCharacterStats').toJS()[0].str,
    enemyStats: state.get('enemyStats').toArray(),
    enemyStats0: state.get('enemyStats').toJS()[0] ? state.get('enemyStats').toJS()[0] : null,
    enemyStats1: state.get('enemyStats').toJS()[1] ? state.get('enemyStats').toJS()[1] : null,
    enemyStats2: state.get('enemyStats').toJS()[2] ? state.get('enemyStats').toJS()[2] : null,
    enemyStats3: state.get('enemyStats').toJS()[3] ? state.get('enemyStats').toJS()[3] : null,
    enemyStats4: state.get('enemyStats').toJS()[4] ? state.get('enemyStats').toJS()[4] : null,
    isEnemyTarget0: state.get('isEnemyTarget').toJS()[0],
    isEnemyTarget1: state.get('isEnemyTarget').toJS()[1],
    isEnemyTarget2: state.get('isEnemyTarget').toJS()[2],
    isEnemyTarget3: state.get('isEnemyTarget').toJS()[3],
    isEnemyTarget4: state.get('isEnemyTarget').toJS()[4],
    heroStats: state.get('updateCharacterStats').toJS(),
    // isEnemyTarget: state.get('isEnemyTarget'),
    isEnemyTarget: state.get('isEnemyTarget').toJS()[0].attacking || state.get('isEnemyTarget').toJS()[1].attacking
                           || state.get('isEnemyTarget').toJS()[2].attacking || state.get('isEnemyTarget').toJS()[3].attacking
                           || state.get('isEnemyTarget').toJS()[4].attacking ? true : false,
    getNextTurn: state.get('getNextTurn').toJS()[0],
    getListOfTurnOrder: state.get('getListOfTurnOrder'),
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0],
    heroLength: state.get('updateCharacterStats').toJS().length,
    isHero0Dead: state.get('updateCharacterStats').toJS()[0] && state.get('updateCharacterStats').toJS()[0].killed,
    isHero1Dead: state.get('updateCharacterStats').toJS()[1] && state.get('updateCharacterStats').toJS()[1].killed,
    isHero2Dead: state.get('updateCharacterStats').toJS()[2] && state.get('updateCharacterStats').toJS()[2].killed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEnemies,
    setBattleScene,
    setPauseBetweenTurns,
    setListOfTurnOrder,
    setNextTurnFromList,
    setHeroAttackingPos2,
    setEnemySelectedTarget,
    setHeroToEnemyTarget,
    setEnemyAttacking,
    updateEnemyStats,
    updateEnemyStatsFromAttack,
    setMenuAttackSelected,
    removeEnemyFromList,
    deleteEnemyWhenKilled,
    setHeroAttacking
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
