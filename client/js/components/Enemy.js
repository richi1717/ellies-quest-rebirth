import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import { autobind } from 'core-decorators';
import PureComponent from './pure-component';
import { EnemyAttackFX } from '../helpers/sound-fx';
import { setTimeOutHelper } from '../helpers/time-out';
import { damageCalculation, getBaseDamage } from '../helpers/damage-calc';
import { calcLevel } from '../helpers/calculate-level';
import { fromJS } from 'immutable';

import '../../sass/style.scss';
import '../../sass/_enemies.scss';

@autobind
export default class Enemy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      isAttackingHero0: false,
      isAttackingHero1: false,
      isAttackingHero2: false
    };

    this.isEnemyAlive = this.isEnemyAlive.bind(this);
  }

  shouldComponentUpdate() {
    // console.log(this.areAllEnemiesDead(), this.isEnemyAlive());
    if (this.areAllEnemiesDead() || (!this.isEnemyAlive() && this.props.getNextTurn !== 'enemy' + this.props.position)) {
      // console.log('false');
      return false;
    } else {
      // console.log('true');
      return true;
    }
  }

  componentDidMount() {
    setTimeOutHelper(2000 - this.props.turnSpeed, this.props.setListOfTurnOrder, 'enemy' + this.props.position);
  }

  componentDidUpdate() {
    if (this.props.getNextTurn === 'fake0') {
      this.setInitialTurn();
    } else if (this.props.isPauseBetweenTurns) {
      this.dmg = null;
    // } else if (!this.isEnemyAlive() && this.props.getNextTurn === 'enemy' + this.props.position) {
    //   console.log('in first else if');
    //   // this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
    } else if (!this.props.isEnemyAttacking && this.props.getNextTurn === 'enemy' + this.props.position) {
      console.log('second else if');
      console.log('attacking hero! from: enemy' + this.props.position);
      this.props.setEnemyAttacking(true);
      setTimeout(function () {
        this.handleEnemyAttacking();
        this.props.setEnemyAttacking(false);
      }.bind(this), 1000);
    } else if (this.props['isEnemyTarget' + this.props.position].attacking) {
      const DMG_DISPLAY = document.getElementById('dmg-display' + this.props.position);
      this.damageDisplayFadeIn(DMG_DISPLAY, 'block');
    }
  }

  setInitialTurn() {
    if (this.props.getListOfTurnOrder.toJS()[0] === 'enemy' + this.props.position) {
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
    }
  }

  getRandomTargetForAttack() {
    console.log('inside random');
    const TARGET = _.random(1, this.props.heroLength) - 1;
    return this.isHeroDead(TARGET);
  }

  isHeroDead(target) {
    if (this.props.isHero0Dead && this.props.isHero1Dead && this.props.isHero2Dead) {
      console.log('they\'re all dead!!!');
    } else {
      let targetNum;
      switch (target) {
        case 0: {
          if (this.props.isHero0Dead) {
            targetNum = this.props.isHero1Dead ? 2 : 1;
          } else {
            targetNum = target;
          }
          return targetNum;
        }
        case 1: {
          if (this.props.isHero1Dead) {
            targetNum = this.props.isHero2Dead ? 0 : 2;
          } else {
            targetNum = target;
          }
          return targetNum;
        }
        case 2: {
          if (this.props.isHero2Dead) {
            targetNum = this.props.isHero0Dead ? 1 : 0;
          } else {
            targetNum = target;
          }
          return targetNum;
        }
        default: {
          return 0;
        }
      }
      return targetNum;
    }
  }

  handleEnemyAttacking() {
    if (!this.state.isAttackingHero0 || !this.state.isAttackingHero1 || !this.state.isAttackHero2) {
      const TARGET = this.getRandomTargetForAttack();
      console.log("attacking hero" + TARGET);
      this.props.setEnemySelectedTarget('hero' + TARGET, getBaseDamage(this.props.str, this.props.level));
      this.props.setPauseBetweenTurns(true);
      this.props.setListOfTurnOrder(this.props.getNextTurn);
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      this.setState({
        isAttackingHero0: TARGET === 0 ? true : false,
        isAttackingHero1: TARGET === 1 ? true : false,
        isAttackingHero2: TARGET === 2 ? true : false
      });
      setTimeout(function () {
        this.setState({
          isAttackingHero0: false,
          isAttackingHero1: false,
          isAttackingHero2: false
        });
      }.bind(this), 850);
    }
  }

  handleHeroAttacking(enemyTarget) {
    console.log(this.props.position);
    const ENEMY_STATS = this.props['enemyStats' + this.props.position];
    const DMG = this.getDamageAmount(ENEMY_STATS);
    const NEW_HP = ENEMY_STATS.currentHp - DMG;
    this.dmg = DMG;
    if (NEW_HP <= 0) {
      const ENEMY = document.getElementById('enemy' + this.props.position);
      let indexOfDead;
      for (const KEY in this.props.getListOfTurnOrder.toJS()) {
        this.props.getListOfTurnOrder.toJS()[KEY] === 'enemy' + this.props.position ? indexOfDead = KEY : null;
      }
      this.props.removeEnemyFromList(indexOfDead);
      this.enemyKilledFadeOut(ENEMY, 'block');
      setTimeOutHelper(2000, this.props.deleteEnemyWhenKilled, this.props.position);
    } else {
      const NEW_STATS = this.props.enemyStats.find(function (stat) {
        return stat.get('id') === this.props.position;
      }.bind(this)).set('currentHp', NEW_HP);
      this.props.updateEnemyStats(NEW_STATS.toJSON(), this.props.position);
    }
    console.log('%cdamage: ' + DMG, 'color: orange');
    console.log('%cEnemy Health: ' + NEW_HP, 'color: green');
  }

  getDamageAmount(enemy) {
    const POWER = 4;
    const BASE = getBaseDamage(this.props.heroStr, calcLevel(this.props.heroStats[0].exp));
    let damage = damageCalculation(POWER, enemy.def, this.props.heroStr);
    damage = damage > 0 ? damage : 1;
    return damage;
  }

  handleClick() {
    if (this.props.isHero0Attacking) {
      const ENEMY_TARGET = this.props['isEnemyTarget' + this.props.position];
      this.handleHeroAttacking(ENEMY_TARGET);
      this.props.setHeroToEnemyTarget(true, this.props.position);
      this.props.setMenuAttackSelected(false);
      setTimeOutHelper(1300, this.props.setHeroToEnemyTarget, false, this.props.position);
      console.log('finished');
    } else if (this.props.isHero1Attacking) {
      const ENEMY_TARGET = this.props['isEnemyTarget' + this.props.position];
      this.handleHeroAttacking(ENEMY_TARGET);
      this.props.setHeroToEnemyTarget(true, this.props.position);
      this.props.setMenuAttackSelected(false);
      setTimeOutHelper(1300, this.props.setHeroToEnemyTarget, false, this.props.position);
      console.log('finished');
    } else if (this.props.isHero2Attacking) {
      const ENEMY_TARGET = this.props['isEnemyTarget' + this.props.position];
      this.handleHeroAttacking(ENEMY_TARGET);
      this.props.setHeroToEnemyTarget(true, this.props.position);
      this.props.setMenuAttackSelected(false);
      setTimeOutHelper(1300, this.props.setHeroToEnemyTarget, false, this.props.position);
      console.log('finished');
    }
  }

  damageDisplayFadeIn(element, display) {
    // console.log(element);
    element.style.opacity = 0;
    element.style.display = display || "block";
    let pos = 0;

    (function fade() {
      var val = parseFloat(element.style.opacity);
      if (!((val += 0.01) > 1)) {
        element.style.opacity = val;
        pos--;
        element.style.top = pos + 'px';
        requestAnimationFrame(fade);
      }
    })();
  }

  enemyKilledFadeOut(element, display) {
    element.style.opacity = 1;
    element.style.display = display || "block";

    (function fade() {
      var val = parseFloat(element.style.opacity);
      if (!((val -= 0.01) < 0)) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  setMusic() {
    return (
      <audio
        controls name="media"
        src="/resources/music/swipe.mp3"
        autoPlay
        type="audio/mpeg"
      />
    );
  }

  showDamageOverHead() {
    const STYLE = { display: 'none' };
    return (
      <div
        id={"dmg-display" + this.props.position}
        className="damage-display"
      >
        {this.dmg}
      </div>
    );
  }

  isEnemyAlive() {
    return !(this.props.enemyStats[this.props.position].toJS().killed);
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
    const ENEMY_CLASS = {
      'enemy-sprites': true,
      'enemy-attack-hero0': this.state.isAttackingHero0,
      'enemy-attack-hero1': this.state.isAttackingHero1,
      'enemy-attack-hero2': this.state.isAttackingHero2
    };

    const DMG_DISPLAY = document.getElementById('dmg-display' + this.props.position);
    if (() => {this.isEnemyAlive();}) {

      return (
        <div onClick={() => this.handleClick()}>
          <div
            id={"enemy" + this.props.position}
            ref={"enemy" + this.props.position}
            className={classnames(ENEMY_CLASS) + " " + this.props.enemyClass + " enemy" + this.props.position}
          >
            {this.showDamageOverHead()}
          </div>
          {this.state.isAttackingHero0 ? <EnemyAttackFX /> : null}
          {this.state.isAttackingHero1 ? <EnemyAttackFX /> : null}
          {this.state.isAttackingHero2 ? <EnemyAttackFX /> : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

Enemy.propTypes = {
  str: PropTypes.number,
  heroStr: PropTypes.number,
  level: PropTypes.number,
  setEnemySelectedTarget: PropTypes.func,
  setEnemyAttacking: PropTypes.func,
  enemyClass: PropTypes.string,
  position: PropTypes.number,
  setHeroAttacking: PropTypes.func,
  updateEnemyStats: PropTypes.func,
  isHeroAttacking: PropTypes.bool,
  currentHp: PropTypes.number,
  enemyStats: PropTypes.array,
  def: PropTypes.number,
  updateEnemyStats: PropTypes.func,
  setHeroToEnemyTarget: PropTypes.func
};
