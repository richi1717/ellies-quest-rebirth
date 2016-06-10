import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEnemies, setBattleScene, setListOfTurnOrder, setNextTurnFromList, setHeroAttackingPos2, getEnemySelectedTarget, setHeroToEnemyTarget, setEnemyAttacking, updateEnemyStats, updateEnemyStatsFromAttack, setHeroAttacking } from '../actions/index';
import classnames from 'classnames';
import { autobind } from 'core-decorators';
import PureComponent from './pure-component';
import * as sounds from '../utils/sound-fx';
import timer from '../utils/time-out';
import damageCalcHelper from '../utils/damage-calc';
import getBaseDamage from '../utils/base-damage';

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

  componentDidMount() {
    this.props.setListOfTurnOrder('enemy' + this.props.position);
  }

  componentDidUpdate() {
    const enemyTarget = this.props['isEnemyTarget' + this.props.position];
    if (this.props.isHeroAttacking && enemyTarget.attacking) {
      this.handleHeroAttacking(enemyTarget);
    } else if (!this.props.isEnemyAttacking && this.props.getNextTurn === 'enemy' + this.props.position) {
      setTimeout(function () {
        document.getElementById('enemy' + this.props.position).click();
      }.bind(this), 2500);
      // console.log('loop?');
    } else if (this.props.isEnemyAttacking) {
      // console.log('you attacking?!');
    }
    // console.log(this.props.getNextTurn);
  }

  handleHeroAttacking(enemyTarget) {
    console.log('getNextTurn: ' + this.props.getNextTurn);
      const enemyStats = this.props['enemyStats' + this.props.position];
      const newHp = enemyStats.currentHp - this.getDamageAmount(enemyStats);
      const newStats = this.props.enemyStats.find(function (stat) {
        return stat.get('id') === this.props.position;
      }.bind(this)).set('currentHp', newHp);

      this.props.setHeroAttacking(false);
      this.props.updateEnemyStats(newStats.toJSON(), this.props.position);
      this.props.setListOfTurnOrder(this.props.getNextTurn);

      console.log('%cdamage: ' + this.getDamageAmount(enemyStats), 'color: orange');
      console.log('%cEnemy Health: ' + newHp, 'color: green');
      this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
  }

  getDamageAmount(enemy) {
    // console.log(enemy.def, this.props.heroStr);
    const power = 4;
    let damage = damageCalcHelper(power, enemy.def, this.props.heroStr);
    damage = damage > 0 ? damage : 1;
    return damage;
  }

  handleTest(e) {
    if (this.props.isHeroAttacking) {
      this.props.setHeroToEnemyTarget(true, this.props.position);
      timer(550, this.props.setHeroAttackingPos2, true);
      timer(1300, this.props.setHeroAttackingPos2, false);
      timer(1300, this.props.setHeroToEnemyTarget, false, this.props.position);
    } else if (this.props.position.toString() === this.props.getNextTurn.slice(5)) {
      // setTimeout(function () {
        if (!this.state.isAttacking) {
          this.props.getEnemySelectedTarget('hero1', getBaseDamage(this.props.str, this.props.level));
          this.props.setEnemyAttacking(true);
          this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
          this.props.setListOfTurnOrder(this.props.getNextTurn);
        }
        this.setState({
          isAttacking: true
        });
        setTimeout(function () {
          this.setState({
            isAttacking: false
          });
        }.bind(this), 750);
      // }.bind(this), 1000);
    }
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

  render() {
    // console.log(this.props);
    const enemyClass = {
      'enemy-sprites': true,
      'enemy-attack-hero1': this.state.isAttacking
    };
    return (
      <div>
        <div
          id={"enemy" + this.props.position}
          onClick={this.handleTest}
          className={classnames(enemyClass) + " " + this.props.enemyClass + " enemy" + this.props.position}
        />
        {this.state.isAttacking ? sounds.enemyAttackFX() : null}
      </div>
    );
  }
}

Enemy.propTypes = {
  str: PropTypes.number,
  heroStr: PropTypes.number,
  level: PropTypes.number,
  getEnemySelectedTarget: PropTypes.func,
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
    isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    // isHeroAttacking: state.get('isHeroAttacking').isHeroAttacking,
    heroStr: state.get('updateCharacterStats').get('str'),
    enemyStats: state.get('enemyStats').toArray(),
    enemyStats0: state.get('enemyStats').toArray()[0] ? state.get('enemyStats').toArray()[0].toJSON() : null,
    enemyStats1: state.get('enemyStats').toArray()[1] ? state.get('enemyStats').toArray()[1].toJSON() : null,
    enemyStats2: state.get('enemyStats').toArray()[2] ? state.get('enemyStats').toArray()[2].toJSON() : null,
    enemyStats3: state.get('enemyStats').toArray()[3] ? state.get('enemyStats').toArray()[3].toJSON() : null,
    enemyStats4: state.get('enemyStats').toArray()[4] ? state.get('enemyStats').toArray()[4].toJSON() : null,
    isEnemyTarget0: state.get('isEnemyTarget')[0].toJSON(),
    isEnemyTarget1: state.get('isEnemyTarget')[1].toJSON(),
    isEnemyTarget2: state.get('isEnemyTarget')[2].toJSON(),
    isEnemyTarget3: state.get('isEnemyTarget')[3].toJSON(),
    isEnemyTarget4: state.get('isEnemyTarget')[4].toJSON(),
    isEnemyTarget: state.get('isEnemyTarget'),
    getNextTurn: state.get('getNextTurn').toJS()[0],
    getListOfTurnOrder: state.get('getListOfTurnOrder')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEnemies, setBattleScene, setListOfTurnOrder, setNextTurnFromList, setHeroAttackingPos2, getEnemySelectedTarget, setHeroToEnemyTarget, setEnemyAttacking, updateEnemyStats, updateEnemyStatsFromAttack, setHeroAttacking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
