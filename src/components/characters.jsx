import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import classnames from 'classnames';
import PureComponent from './pure-component';
import { autobind } from 'core-decorators';

import { fetchCharacters, setBattleScene, setNextTurnFromList, setListOfTurnOrder, setEnemyAttacking, updateCharacterStats, setHeroAttacking, ROOT_URL } from '../actions/index';
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
      done: false
    };
  }

  componentWillMount() {
    const url = `${ROOT_URL}/characters`;
    this.getCharacters = axios.get(url)
      .then(response => {
        this.getInitialCharacterStats = response.data[0];
        this.props.updateCharacterStats(this.getInitialCharacterStats);
        this.props.setListOfTurnOrder(this.getInitialCharacterStats.battleName);
        this.setState({done: true});
      });
  }

  componentWillUnmount() {
    this.getCharacters.abort();
  }

  componentDidUpdate() {
    if (this.props.isEnemyAttacking) {
      if (this.getDamageAmount() > 0) {
        const newHp = this.props.heroCurrentHp - this.getDamageAmount();
        const newStats = this.props.heroStats.set('currentHp', newHp);
        this.props.setEnemyAttacking(false);
        // console.log('%cdamage: ' + this.getDamageAmount(), 'color: red');
        this.props.updateCharacterStats(newStats.toJSON());
      }
    }
  }

  render() {
    const heroClass = {
      'battle-ff-sprite': true,
      'battle-hero-position1-back': !this.props.isHeroAttacking,
      'battle-hero-position1-front': this.props.isHeroAttacking,
      'battle-hero-red-boy': true,
      'battle-hero-attack': this.props.isHeroAttackingPos2,
      'battle-hero-position1': this.props.isHeroAttacking,
      'attack-enemy0': this.props.isEnemyTarget0,
      'attack-enemy1': this.props.isEnemyTarget1,
      'attack-enemy2': this.props.isEnemyTarget2,
      'attack-enemy3': this.props.isEnemyTarget3,
      'attack-enemy4': this.props.isEnemyTarget4
    };
    return (
      <div onClick={this.handleTest2}>
        <div>{this.props.heroCurrentHp}</div>
        <div
          ref={"hero" + this.props.numberTest}
          onClick={this.handleTest}
          className={classnames(heroClass)}
        />
        {this.props.isHeroAttackingPos2 ? sounds.heroAttackFX() : null}
      </div>
    );
  }

  handleAttack() {
    console.log('hey');
  }

  setNewHeroStats() {
    console.log(this.getDamageAmount());

  }

  getDamageAmount() {
    const power = 1/16;
    const damage = damageCalcHelper(power, this.props.heroDef, this.props.enemyStr);
    // const damage = _.ceil((power * (512 - this.props.heroDef) * this.props.enemyStr) / (1.6 * 512));
    return damage;
  }

  handleTest() {
    this.setState({test: !this.state.test});
  }

  handleTest2() {
    this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
    // this.props.fetchCharacters();
    this.props.setHeroAttacking(!this.props.isHeroAttacking);
    // this.props.setBattleScene('grass');
    console.log('getListOfTurnOrder(): ' + this.props.getListOfTurnOrder);
  }
}

function mapStateToProps(state) {
  const c = state.get('updateCharacterStats');
  // console.log(state.get('getNextTurn').toJS());
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    heroMaxHp: c.get('maxHp'),
    heroCurrentHp: c.get('currentHp'),
    heroMaxMp: c.get('maxMp'),
    heroCurrentMp: c.get('currentMp'),
    heroAgility: c.get('agility'),
    accuracy: c.get('accuracy'),
    heroStr: c.get('str'),
    magic: c.get('magic'),
    exp: c.get('exp'),
    heroDef: c.get('def'),
    evade: c.get('evade'),
    name: c.get('name'),
    classes: c.get('classes'),
    refName: c.get('refName'),
    targetForAttack: state.get('targetForAttack').get('targetForAttack'),
    enemyStr: state.get('targetForAttack').get('enemyStr'),
    numberTest: 1,
    heroStats: c,
    // isHeroAttacking: state.get('isHeroAttacking').isHeroAttacking,
    isHeroAttacking: state.get('getNextTurn').toJS()[0] === 'hero1' ? true : false,
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking'),
    isEnemyTarget0: state.get('isEnemyTarget')[0].get('attacking'),
    isEnemyTarget1: state.get('isEnemyTarget')[1].get('attacking'),
    isEnemyTarget2: state.get('isEnemyTarget')[2].get('attacking'),
    isEnemyTarget3: state.get('isEnemyTarget')[3].get('attacking'),
    isEnemyTarget4: state.get('isEnemyTarget')[4].get('attacking'),
    isHeroAttackingPos2: state.get('isHeroAttacking').isHeroAttackingPos2,
    getListOfTurnOrder: state.get('getListOfTurnOrder'),
    getNextTurn: state.get('getNextTurn')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCharacters, setBattleScene, setNextTurnFromList, setListOfTurnOrder, setEnemyAttacking, updateCharacterStats, setHeroAttacking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
