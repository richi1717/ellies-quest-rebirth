import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import classnames from 'classnames';
import PureComponent from './pure-component';
import { autobind } from 'core-decorators';
import { fromJS } from 'immutable';
import { setTimeOutHelper } from '../utils/time-out';

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

import * as sounds from '../utils/sound-fx';
import damageCalcHelper from '../utils/damage-calc';

import '../../sass/style.scss';
import '../../sass/_battle-character.scss';
import '../../sass/_battle-backgrounds.scss';

@autobind
class Character extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false,
      pos2: false
    };
  }

  componentWillMount() {
    const URL = `${ROOT_URL}/characters`;
    this.getCharacters = axios.get(URL)
      .then(response => {
        this.getInitialCharacterStats = response.data[0];
        this.props.updateCharacterStats(this.getInitialCharacterStats, 0);
        this.props.setListOfTurnOrder(this.getInitialCharacterStats.battleName);
        this.setState({done: true});
      });
  }

  componentWillUnmount() {
    this.getCharacters.abort();
  }

  setHeroAttackingAnimation() {
    setTimeout(function () {
      this.setState({ pos2: true });
    }.bind(this), 550);
    setTimeout(function () {
      this.setState({ pos2: false });
    }.bind(this), 1300);
  }

  setNextTurnAfterHeroIsDone() {
    setTimeOutHelper(1000, this.props.setPauseBetweenTurns, true);
    setTimeOutHelper(1300, this.props.setListOfTurnOrder, this.props.getNextTurn);
    setTimeOutHelper(1300, this.props.setNextTurnFromList, this.props.getListOfTurnOrder);
    setTimeOutHelper(1300, this.props.setHeroAttacking, false);
  }

  handleHeroTurn() {
    this.setHeroAttackingAnimation();
    this.setNextTurnAfterHeroIsDone();
  }

  handleEnemyAttacking() {
    const DMG = this.getDamageAmount();
    if (DMG > 0) {
      const NEW_HP = this.props.heroCurrentHp - DMG;
      const NEW_STATS = this.props.heroStats.set('currentHp', NEW_HP);
      this.props.updateCharacterStats(NEW_STATS.toJSON());
      console.log('%cdamage: ' + DMG, 'color: red');
    }
  }

  componentDidUpdate() {
    const IS_HERO_TURN = this.props.isHeroAttackingAnimation && this.props.isHeroTurn && !this.state.pos2;
    const IS_ENEMY_ATTACKING = this.props.isEnemyAttacking && this.props.enemyStr && this.props.getEnemySelectedTarget === 'hero1';

    if (this.props.isPauseBetweenTurns) {
    } else if (IS_HERO_TURN) {
      this.handleHeroTurn();
    } else if (IS_ENEMY_ATTACKING) {
      console.log('doing it');
      this.props.setEnemySelectedTarget(null, null, null);
      this.handleEnemyAttacking();
    } else if (!this.props.isHeroTurn && this.props.getNextTurn === 'hero1') {
      console.log('shoot');
      this.props.setHeroAttacking(true);
      // console.log(this.props.getNextTurn);
      // this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // document.getElementById('hero' + this.props.numberTest).click();
    } else {
      // console.log(IS_HERO_TURN, this.props.isPauseBetweenTurns);
    }
  }

  getDamageAmount() {
    const POWER = 1/16;
    const DMG = damageCalcHelper(POWER, this.props.heroDef, this.props.enemyStr);
    return DMG;
  }

  handleClick() {
    // console.log(this.props.getListOfTurnOrder.toJS()[0]);
    if (this.props.getListOfTurnOrder.toJS()[0] === 'hero1') {
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // this.props.setPauseBetweenTurns(true);
      this.props.setHeroAttacking(true);
      // this.props.setBattleScene('grass');
      console.log('getListOfTurnOrder(): ' + this.props.getListOfTurnOrder);
    }
  }

  render() {
    const HERO_CLASS = {
      'battle-ff-sprite': true,
      'battle-hero-red-boy': true,
      'battle-hero-position1-back': true,
      'battle-hero-attack': this.state.pos2,
      'attack-enemy0': this.props.isEnemyTarget0,
      'attack-enemy1': this.props.isEnemyTarget1,
      'attack-enemy2': this.props.isEnemyTarget2,
      'attack-enemy3': this.props.isEnemyTarget3,
      'attack-enemy4': this.props.isEnemyTarget4,
      'battle-hero-position1': this.props.isHeroAttacking && !this.props.isPauseBetweenTurns,
      'battle-hero-position1-front': this.props.isHeroAttacking && !this.props.isPauseBetweenTurns
    };
    return (
      <div onClick={this.handleClick}>
        <div>{this.props.heroCurrentHp}</div>
        <div
          className={classnames(HERO_CLASS)}
        />
        {this.state.pos2 ? sounds.heroAttackFX() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats');
  // console.log(state.get('getEnemySelectedTarget').toJS().targetForAttack);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    heroMaxHp: C.get('maxHp'),
    heroCurrentHp: C.get('currentHp'),
    heroMaxMp: C.get('maxMp'),
    heroCurrentMp: C.get('currentMp'),
    heroAgility: C.get('agility'),
    accuracy: C.get('accuracy'),
    heroStr: C.get('str'),
    magic: C.get('magic'),
    exp: C.get('exp'),
    heroDef: C.get('def'),
    evade: C.get('evade'),
    name: C.get('name'),
    classes: C.get('classes'),
    refName: C.get('refName'),
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS().targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS().enemyStr,
    numberTest: 1,
    heroStats: C,
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
    getNextTurn: state.get('getNextTurn').toJS()[0]
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
