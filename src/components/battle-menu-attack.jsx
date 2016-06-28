import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { autobind } from 'core-decorators';
// import axios from 'axios';
import { setMenuAttackSelected } from '../actions/index';
import classnames from 'classnames';
import PureComponent from './pure-component';

import '../../sass/_menu.scss';

@autobind
class BattleMenuAttack extends PureComponent {
  getRenderedListOfCharacters() {
    const ARR = [];
    for (const KEY in this.props.heroStats) {
      ARR.push(
        <li key={KEY}>
          <button className={"menu-select attack-character"}>
            {this.props.heroStats[KEY].name}
          </button>
        </li>
      );
    }
    return ARR;
  }

  getRenderedListOfEnemies() {
    const ARR = [];
    for (const KEY in this.props.enemyStats) {
      const CLICK = "handleEnemy" + KEY + "AttackClick";
      /* eslint-disable */
      if (!this.props.enemyStats[KEY].killed) {
        ARR.push(
          <li key={KEY}>
            <button onClick={this[CLICK]} className={"menu-select " + this.props.target + "-position"}>
            {this.props.enemyStats[KEY].name}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  }

  handleEnemy0AttackClick() {
    this.dispatchClickEvent('enemy0');
  }

  handleEnemy1AttackClick() {
    this.dispatchClickEvent('enemy1');
  }

  handleEnemy2AttackClick() {
    this.dispatchClickEvent('enemy2');
  }

  handleEnemy3AttackClick() {
    this.dispatchClickEvent('enemy3');
  }

  handleEnemy4AttackClick() {
    this.dispatchClickEvent('enemy4');
  }

  dispatchClickEvent(id) {
    document.getElementById(id).click();
  }

  render() {
    const CLASSES = {
      'battle-menu-turn': true,
      'menu-attack': true,
      'sub-menu': true,
      'more-than-five': this.props.amountOfEnemies > 4 ? true : false
    };
    const INLINE_STYLE = {
      display: 'none'
    };
    if (this.props.isMenuAttackSelected) {
      if (this.props.amountOfEnemies > 4) {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfEnemies()}
            </div>
            <div>
              {this.getRenderedListOfCharacters()}
            </div>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfEnemies()}
              {this.getRenderedListOfCharacters()}
            </div>
            {this.props.children}
          </div>
        );
      }
    } else {
      return <span style={INLINE_STYLE} />;
    }
  }
}

function mapStateToProps(state) {
  const C = state.get('updateCharacterStats');
  // console.log(c);
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
    heroName0: C.get('name'),
    classes: C.get('classes'),
    refName: C.get('refName'),
    getEnemySelectedTarget: state.get('getEnemySelectedTarget').toJS()[0].targetForAttack,
    enemyStr: state.get('getEnemySelectedTarget').toJS()[0].enemyStr,
    numberTest: 1,
    heroStats: state.get('updateCharacterStats').toJS(),
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
    getNextTurn: state.get('getNextTurn').toJS()[0],
    enemyStats: state.get('enemyStats').toJS(),
    amountOfEnemies: state.get('enemyStats').toArray().length,
    isMenuAttackSelected: state.get('isMenuAttackSelected').toJS()[0]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMenuAttackSelected }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleMenuAttack);
