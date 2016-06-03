import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import classnames from 'classnames';
import PureComponent from './pure-component';
import { autobind } from 'core-decorators';

import { fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats, ROOT_URL } from '../actions/index';

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
        console.log('%cdamage: ' + this.getDamageAmount(), 'color: red');
        this.props.updateCharacterStats(newStats.toJSON());
      }
    }
  }

  render() {
    const heroClass = {
      'battle-ff-sprite': true,
      'battle-hero-position1-back': !this.state.test,
      'battle-hero-position1-front': this.state.test,
      'battle-hero-red-boy': true,
      'battle-hero-position1': this.state.test
    };
    console.log('%cHealth: ' + this.props.heroCurrentHp, 'color: green');
    return (
      <div onClick={this.handleTest2}>
        <div>{this.props.heroCurrentHp}</div>
        <div
          ref={"hero" + this.props.numberTest}
          onClick={this.handleTest}
          className={classnames(heroClass)}
        />
      </div>
    );
  }

  setNewHeroStats() {
    console.log(this.getDamageAmount());

  }

  getDamageAmount() {
    const power = 1/16;
    const damage = _.ceil((power * (512 - this.props.heroDef) * this.props.enemyStr) / (1.6 * 512));
    return damage;
  }

  handleTest() {
    this.setState({test: !this.state.test});
  }

  handleTest2() {
    this.props.fetchCharacters();
    this.props.setBattleScene('grass');
  }
}

function mapStateToProps(state) {
  const c = state.get('updateCharacterStats');
  // console.log(c);
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
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);
