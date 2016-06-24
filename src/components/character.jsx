import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { fromJS } from 'immutable';
import axios from 'axios';
import classnames from 'classnames';

import PureComponent from './pure-component';

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

import { setTimeOutHelper } from '../utils/time-out';
import * as sounds from '../utils/sound-fx';
import { damageCalculation, getBaseDamage } from '../utils/damage-calc';

import '../../sass/style.scss';
import '../../sass/_battle-character.scss';
import '../../sass/_battle-backgrounds.scss';

@autobind
export default class Character extends PureComponent {
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
    if (this.areAllEnemiesDead()) {
      // this.handleVictoryState();
    } else if (this.props.isPauseBetweenTurns) {
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

  handleVictoryState() {
    const STYLE = { color: 'black'};
    return <div style={STYLE}>You Win!!!!!!!</div>;
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
      let newHp = this.props.heroCurrentHp - DMG;
      newHp = newHp <= 0 ? 0 : newHp;
      const NEW_STATS = this.props.heroStats.set('currentHp', newHp);
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

  areAllEnemiesDead() {
    let dead = false;
    for (let i = 0; i < this.props.enemyStats.length; i ++) {
      if (this.props.enemyStats[i].get('killed')) {
        dead = true;
      } else {
        dead = false;
        return false;
      }
    }
    return dead;
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
      'battle-hero-position1-front': this.props.isHeroAttacking && !this.props.isPauseBetweenTurns,
      'dead': this.props.isHeroDead
    };
    return (
      <div onClick={this.handleClick}>
        <div>{this.props.heroCurrentHp}</div>
        <div
          className={classnames(HERO_CLASS)}
        >
          {this.showDamageOverHead()}
          {this.areAllEnemiesDead() ? this.handleVictoryState() : null}
        </div>
        {this.state.pos2 ? sounds.heroAttackFX() : null}
        {this.areAllEnemiesDead() ? sounds.battleVictoryMusic() : null}
      </div>
    );
  }
}
