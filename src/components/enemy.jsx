import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEnemies, setBattleScene, getEnemySelectedTarget, setHeroToEnemyTarget, setEnemyAttacking, updateEnemyStats, setHeroAttacking } from '../actions/index';
import classnames from 'classnames';
import { autobind } from 'core-decorators';
import PureComponent from './pure-component';

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

  componentDidUpdate() {
    if (this.props.isHeroAttacking) {
      for (let i = 0; i < 5; i++) {
        if (this.props.isEnemyTarget[i].toJSON().attacking
        && (this.props.isEnemyTarget[i].toJSON().id === this.props.position)) {
          console.log('nailed it' + i);
          if (this.getDamageAmount(i) > 0) {
            const newHp = this.props.enemyStats[i].get('currentHp') - this.getDamageAmount(i);
            const newStats = this.props.enemyStats[i].set('currentHp', newHp);
            this.props.setHeroAttacking(false);
            console.log('%cdamage: ' + this.getDamageAmount(i), 'color: orange');
            console.log(newHp, newStats.toJSON());
            this.props.updateEnemyStats(newStats.toJSON(), i + 1);
          }
        }
      }
    }
  }

  getDamageAmount(enemy) {
    console.log(this.props.enemyStats[enemy].toJSON().def, this.props.heroStr);
    const power = 1/16;
    const damage = _.ceil((power * (512 - this.props.enemyStats[enemy].toJSON().def) * this.props.heroStr) / (0.16 * 512));
    console.log(damage);
    return damage;
  }

  handleTest(e) {
    const baseDmg = this.props.str + (_.ceil((this.props.str + this.props.level) / 3.2) * _.ceil((this.props.str * this.props.level) / 3.2));
    if (this.props.isHeroAttacking) {
      this.props.setHeroToEnemyTarget(true, this.props.position);
      setTimeout(function () {
        this.props.setHeroToEnemyTarget(false, this.props.position);
      }.bind(this), 750);
    } else {
      if (!this.state.isAttacking) {
        this.props.getEnemySelectedTarget('hero1', baseDmg);
        this.props.setEnemyAttacking(true);
      }
      this.setState({
        isAttacking: true
      });
      setTimeout(function () {
        this.setState({
          isAttacking: false
        });
      }.bind(this), 750);
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
          onClick={this.handleTest}
          className={classnames(enemyClass) + " " + this.props.enemyClass + " enemy" + this.props.position}
        />
        {this.state.isAttacking ? this.setMusic() : null}
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
  // console.log(state.get('isEnemyTarget'));
  return {
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking'),
    isHeroAttacking: state.get('isHeroAttacking').isHeroAttacking,
    heroStr: state.get('updateCharacterStats').get('str'),
    enemyStats: state.get('enemyStats'),
    enemyStats1: state.get('enemyStats')[0] ? state.get('enemyStats')[0].toJSON() : null,
    enemyStats2: state.get('enemyStats')[1] ? state.get('enemyStats')[1].toJSON() : null,
    enemyStats3: state.get('enemyStats')[2] ? state.get('enemyStats')[2].toJSON() : null,
    enemyStats4: state.get('enemyStats')[3] ? state.get('enemyStats')[3].toJSON() : null,
    enemyStats5: state.get('enemyStats')[4] ? state.get('enemyStats')[4].toJSON() : null,
    isEnemyTarget1: state.get('isEnemyTarget')[0].get('attacking'),
    isEnemyTarget2: state.get('isEnemyTarget')[1].get('attacking'),
    isEnemyTarget3: state.get('isEnemyTarget')[2].get('attacking'),
    isEnemyTarget4: state.get('isEnemyTarget')[3].get('attacking'),
    isEnemyTarget5: state.get('isEnemyTarget')[4].get('attacking'),
    isEnemyTarget: state.get('isEnemyTarget')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEnemies, setBattleScene, getEnemySelectedTarget, setHeroToEnemyTarget, setEnemyAttacking, updateEnemyStats, setHeroAttacking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
