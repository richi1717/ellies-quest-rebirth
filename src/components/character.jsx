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
import { HeroAttackFX, BattleVictoryMusic } from '../utils/sound-fx';
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
    this.props.setListOfTurnOrder(this.props.battleName);
    // const URL = `${ROOT_URL}/characters`;
    // this.getCharacters = axios.get(URL)
    //   .then(response => {
    //     this.getInitialCharacterStats = response.data[0];
    //     this.props.updateCharacterStats(this.getInitialCharacterStats, 0);
    //     this.setState({done: true});
    //   });
  }

  componentWillUnmount() {
    // this.getCharacters.abort();
  }

  componentDidUpdate() {
    // console.log(this.props.isHero0Turn, this.props.isHero1Turn);
    const IS_HERO0_TURN = this.props.isHeroAttackingAnimation && this.props.isHero0Turn && !this.state.pos2 && this.props.position === 0;
    const IS_HERO1_TURN = this.props.isHeroAttackingAnimation && this.props.isHero1Turn && !this.state.pos2 && this.props.position === 1;
    const IS_HERO2_TURN = this.props.isHeroAttackingAnimation && this.props.isHero2Turn && !this.state.pos2 && this.props.position === 2;
    const IS_ENEMY_ATTACKING_HERO0 = this.props.isEnemyAttacking && this.props.enemyStr && this.props.getEnemySelectedTarget === 'hero0' && this.props.position === 0;
    const IS_ENEMY_ATTACKING_HERO1 = this.props.isEnemyAttacking && this.props.enemyStr && this.props.getEnemySelectedTarget === 'hero1' && this.props.position === 1;
    const IS_ENEMY_ATTACKING_HERO2 = this.props.isEnemyAttacking && this.props.enemyStr && this.props.getEnemySelectedTarget === 'hero2' && this.props.position === 2;
    // console.log(IS_HERO0_TURN, IS_HERO1_TURN, IS_HERO2_TURN);
    if (this.areAllEnemiesDead()) {
      // this.handleVictoryState();
    } else if (this.props.isPauseBetweenTurns) {
    } else if (IS_HERO0_TURN) {
      this.handleHeroTurn();
    } else if (IS_HERO1_TURN) {
      this.handleHeroTurn();
    } else if (IS_HERO2_TURN) {
      this.handleHeroTurn();
    } else if (IS_ENEMY_ATTACKING_HERO0) {
      console.log('attacking hero 0', this.props.position);
      this.handleEnemyAttacking(this.props.hero0Stats);
      this.props.setEnemySelectedTarget(null, null, null);
    } else if (IS_ENEMY_ATTACKING_HERO1) {
      console.log('attacking hero 1', this.props.position);
      this.handleEnemyAttacking(this.props.hero1Stats);
      this.props.setEnemySelectedTarget(null, null, null);
    } else if (IS_ENEMY_ATTACKING_HERO2) {
      console.log('attacking hero 2', this.props.position);
      this.handleEnemyAttacking(this.props.hero2Stats);
      this.props.setEnemySelectedTarget(null, null, null);
    } else if ((!this.props.isHero0Turn && !this.props.isHero1Turn && !this.props.isHero2Turn) && this.props.getNextTurn === ('hero' + this.props.position)) {
      console.log('shoot');
      // to do fix this area to handle defense and magic clicks
      this.props.setHeroAttacking(true, this.props.position);
      // console.log(this.props.getNextTurn);
      // this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // document.getElementById('hero' + this.props.numberTest).click();
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
    setTimeOutHelper(1300, this.props.setHeroAttacking, false, this.props.position);
  }

  handleHeroTurn() {
    this.setHeroAttackingAnimation();
    this.setNextTurnAfterHeroIsDone();
  }

  handleEnemyAttacking(heroStats) {
    const DMG = this.getDamageAmount();
    const DMG_DISPLAY = document.getElementById('dmg-display-hero' + this.props.position);
    this.damageDisplayFadeIn(DMG_DISPLAY);
    if (DMG > 0) {
      console.log(heroStats.toJS());
      let newHp = heroStats.toJS().currentHp - DMG;
      newHp = newHp <= 0 ? 0 : newHp;
      const NEW_STATS = heroStats.set('currentHp', newHp);
      console.log(NEW_STATS.toJS(), this.props.position);
      this.props.updateCharacterStats(NEW_STATS.toJS(), this.props.position);
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
    if (this.props.getListOfTurnOrder.toJS()[0] === ('hero' + this.props.position)) {
      console.log('ok');
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      // this.props.setPauseBetweenTurns(true);
      this.props.setHeroAttacking(true, this.props.position);
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
        id={"dmg-display-hero" + this.props.position}
        className="damage-display-hero"
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

  position0Classes() {
    return {
      'position1': true,
      'front-row': true,
      'attack-swing': this.state.pos2,
      'defense': this.props.isHero0Defending,
      'attacking': this.props.isHero0Attacking && !this.props.isPauseBetweenTurns,
      'hero-turn': this.props.isHero0Attacking && !this.props.isPauseBetweenTurns,
      'dead': this.props.isHeroDead
    };
  }

  position1Classes() {
    return {
      'position2': true,
      'front-row': true,
      'attack-swing': this.state.pos2,
      'defense': this.props.isHero1Defending,
      'attacking': this.props.isHero1Attacking && !this.props.isPauseBetweenTurns,
      'hero-turn': this.props.isHero1Attacking && !this.props.isPauseBetweenTurns,
      'dead': this.props.isHeroDead
    };
  }

  position2Classes() {
    return {
      'position3': true,
      'back-row': true,
      'attack-swing': this.state.pos2,
      'defense': this.props.isHero2Defending,
      'attacking': this.props.isHero2Attacking && !this.props.isPauseBetweenTurns,
      'hero-turn': this.props.isHero2Attacking && !this.props.isPauseBetweenTurns,
      'dead': this.props.isHeroDead
    };
  }

  enemySelectionPositionClasses(nameOfClass) {
    nameOfClass['attack-enemy0'] = this.props.isEnemyTarget0;
    nameOfClass['attack-enemy1'] = this.props.isEnemyTarget1;
    nameOfClass['attack-enemy2'] = this.props.isEnemyTarget2;
    nameOfClass['attack-enemy3'] = this.props.isEnemyTarget3;
    nameOfClass['attack-enemy4'] = this.props.isEnemyTarget4;
  }
  render() {
    let heroClass;
    const constantClass = {
      'battle-hero': true,
      'battle-ff-sprite': true
    };

    if (this.props.position === 0) {
      heroClass = this.position0Classes();
      if (this.props.getNextTurn === 'hero0') {
        this.enemySelectionPositionClasses(heroClass);
      }
    } else if (this.props.position === 1) {
      heroClass = this.position1Classes();
      if (this.props.getNextTurn === 'hero1') {
        this.enemySelectionPositionClasses(heroClass);
      }
    } else if (this.props.position === 2) {
      heroClass = this.position2Classes();
      if (this.props.getNextTurn === 'hero2') {
        this.enemySelectionPositionClasses(heroClass);
      }
    }
    return (
      <div onClick={this.handleClick}>
        <div>{this.props.heroCurrentHp}</div>
        <div
          className={classnames(constantClass, heroClass) + " " + this.props.classes}
        >
          {this.showDamageOverHead()}
          {this.areAllEnemiesDead() ? this.handleVictoryState() : null}
        </div>
        {this.state.pos2 ? <HeroAttackFX /> : null}
        {this.areAllEnemiesDead() ? <BattleVictoryMusic /> : null}
      </div>
    );
  }
}
