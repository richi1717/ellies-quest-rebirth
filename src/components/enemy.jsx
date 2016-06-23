import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  deleteEnemyWhenKilled,
  setHeroAttacking
} from '../actions/index';

import classnames from 'classnames';
import { autobind } from 'core-decorators';
import PureComponent from './pure-component';
import * as sounds from '../utils/sound-fx';
import { setTimeOutHelper } from '../utils/time-out';
import { damageCalculation, getBaseDamage } from '../utils/damage-calc';
import { calcLevel } from '../utils/calculate-level';
import { fromJS } from 'immutable';

import '../../sass/style.scss';
import '../../sass/_enemies.scss';

@autobind
class Enemy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      isAttacking: false
    };
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
    this.props.setListOfTurnOrder('enemy' + this.props.position);
  }

  componentDidUpdate() {
    // console.log('update');
    if (this.props.isPauseBetweenTurns) {
      this.dmg = null;
    } else if (!this.isEnemyAlive() && this.props.getNextTurn === 'enemy' + this.props.position) {
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
    } else if (!this.props.isEnemyAttacking && this.props.getNextTurn === 'enemy' + this.props.position) {
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

  handleEnemyAttacking() {
    if (!this.state.isAttacking) {
      this.props.setEnemySelectedTarget('hero1', getBaseDamage(this.props.str, this.props.level));
      this.props.setPauseBetweenTurns(true);
      this.props.setListOfTurnOrder(this.props.getNextTurn);
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
      this.setState({
        isAttacking: true
      });
      setTimeout(function () {
        this.setState({
          isAttacking: false
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

  handleTest() {
    if (this.props.isHeroAttacking) {
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
      'enemy-attack-hero1': this.state.isAttacking
    };

    const DMG_DISPLAY = document.getElementById('dmg-display' + this.props.position);
    if (this.isEnemyAlive()) {

      return (
        <div>
          <div
            id={"enemy" + this.props.position}
            onClick={this.handleTest}
            className={classnames(ENEMY_CLASS) + " " + this.props.enemyClass + " enemy" + this.props.position}
          >
            {this.showDamageOverHead()}
          </div>
          {this.state.isAttacking ? sounds.enemyAttackFX() : null}
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

function mapStateToProps(state) {
  // console.log(state.get('enemyStats'));
  return {
    isEnemyAttacking: state.get('isEnemyAttacking').toJS()[0],
    // isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isHeroAttacking: state.get('isHeroAttacking').isHeroAttacking,
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
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0]
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
    deleteEnemyWhenKilled,
    setHeroAttacking
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
