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
import { damageCalculation, getBaseDamage } from '../utils/damage-calc';

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

  componentDidUpdate() {
    const IS_HERO_TURN = this.props.isHeroAttackingAnimation && this.props.isHeroTurn && !this.state.pos2;
    const IS_ENEMY_ATTACKING = this.props.isEnemyAttacking && this.props.enemyStr && this.props.getEnemySelectedTarget === 'hero1';
    if (this.props.isPauseBetweenTurns) {
    } else if (IS_HERO_TURN) {
      this.handleHeroTurn();
    } else if (IS_ENEMY_ATTACKING) {
      console.log('doing it');
      this.handleEnemyAttacking();
      this.props.setEnemySelectedTarget(null, null, null);
    } else if (!this.props.isHeroTurn && this.props.getNextTurn === 'hero1') {
      console.log('shoot');
      // TODO fix this area to handle defense and magic clicks
      this.props.setHeroAttacking(true);
      // console.log(this.props.getNextTurn);
      // this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // document.getElementById('hero' + this.props.numberTest).click();
    } else {
      // console.log(IS_HERO_TURN, this.props.isPauseBetweenTurns);
    }
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
    const DMG_DISPLAY = document.getElementById('dmg-display-hero0');
    this.damageDisplayFadeIn(DMG_DISPLAY);
    if (DMG > 0) {
      const NEW_HP = this.props.heroCurrentHp - DMG;
      const NEW_STATS = this.props.heroStats.set('currentHp', NEW_HP);
      this.props.updateCharacterStats(NEW_STATS.toJS(), 0);
      console.log('%cdamage: ' + DMG, 'color: red');
    }
  }

  getDamageAmount() {
    const POWER = 1/16;
    const STR = this.props.isMenuDefendSelected ? this.props.enemyStr * 0.618 : this.props.enemyStr;
    const DMG = damageCalculation(POWER, this.props.heroDef, STR);
    this.damage = DMG;
    return DMG;
  }

  handleClick() {
    console.log(this.props.getListOfTurnOrder.toJS()[0]);
    if (this.props.getListOfTurnOrder.toJS()[0] === 'hero1') {
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // this.props.setPauseBetweenTurns(true);
      this.props.setHeroAttacking(true);
      // this.props.setBattleScene('grass');
      console.log('getListOfTurnOrder(): ' + this.props.getListOfTurnOrder);
    }
  }

  damageDisplayFadeIn(element, display) {
    element.style.opacity = 0;
    element.style.display = display || "block";
    // element.style.top = '30%';
    let pos = 0;

    (function fade() {
      let val = parseFloat(element.style.opacity);
      if (!((val += 0.01) > 1)) {
        element.style.opacity = val;
        pos--;
        element.style.top = pos + 'px';
        requestAnimationFrame(fade);
      } else {
        element.style.display = 'none';
      }
    })();
  }

  showDamageOverHead() {
    const STYLE = { display: 'none' };
    return (
      <div
        id={"dmg-display-hero0"}
        className="damage-display-hero1"
      >
        {this.damage}
      </div>
    );
  }

  render() {
    const HERO_CLASS = {
      'battle-ff-sprite': true,
      'battle-hero-red-boy': true,
      'battle-hero-position1-back': true,
      'battle-hero-attack': this.state.pos2,
      'defense': this.props.isMenuDefendSelected,
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
        >
          {this.showDamageOverHead()}
        </div>
        {this.state.pos2 ? sounds.heroAttackFX() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats');
  // console.log(C.toJS()[0]);
  // console.log(state.get('getEnemySelectedTarget').toJS().targetForAttack);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    heroMaxHp: C.toJS()[0] ? C.toJS()[0].maxHp : null,
    heroCurrentHp: C.toJS()[0] ? C.toJS()[0].currentHp : null,
    heroMaxMp: C.toJS()[0] ? C.toJS()[0].maxMp : null,
    heroCurrentMp: C.toJS()[0] ? C.toJS()[0].currentMp : null,
    heroAgility: C.toJS()[0] ? C.toJS()[0].agility : null,
    accuracy: C.toJS()[0] ? C.toJS()[0].accuracy : null,
    heroStr: C.toJS()[0] ? C.toJS()[0].str : null,
    magic: C.toJS()[0] ? C.toJS()[0].magic : null,
    exp: C.toJS()[0] ? C.toJS()[0].exp : null,
    heroDef: C.toJS()[0] ? C.toJS()[0].def : null,
    evade: C.toJS()[0] ? C.toJS()[0].evade : null,
    name: C.toJS()[0] ? C.toJS()[0].name : null,
    classes: C.toJS()[0] ? C.toJS()[0].classes : null,
    refName: C.toJS()[0] ? C.toJS()[0].refName : null,
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS().targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS().enemyStr,
    numberTest: 1,
    heroStats: C.get('0'),
    isMenuDefendSelected: state.get('isMenuDefendSelected').toJS()[0],
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
