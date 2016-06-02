import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
// import axios from 'axios';
// import { fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats, ROOT_URL } from '../actions/index';
import classnames from 'classnames';
import PureComponent from './pure-component';

import '../../sass/_menu.scss';

class StatusWindow extends PureComponent {
  constructor(props) {
    super(props);

    this.showStatusPerCharacter = this.showStatusPerCharacter.bind(this);
  }
  render() {
    return (
      <div className="battle-menu-container">
        <div className="battle-menu-main">NAME
          <li>
            <button className="menu-select character">{this.props.heroName}</button>
          </li>
        </div>
        <div className="battle-menu-main-stats">
          <table>
            <tbody>
              <tr>
                <th>HP</th>
                <th>MP</th>
              </tr>
            </tbody>
            <tbody>
              {this.showStatusPerCharacter()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  showStatusPerCharacter() {
    // this.props.heroStats.Map((h) => {
    //
    // });
    return (
      <tr>
        <td>{this.props.heroCurrentHp}/{this.props.heroMaxHp}</td>
        <td>{this.props.heroCurrentMp}/{this.props.heroMaxMp}</td>
      </tr>
    );
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
    heroName: c.get('name'),
    classes: c.get('classes'),
    refName: c.get('refName'),
    targetForAttack: state.get('targetForAttack').get('targetForAttack'),
    enemyStr: state.get('targetForAttack').get('enemyStr'),
    numberTest: 1,
    heroStats: c,
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking')
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats }, dispatch);
// }

export default connect(mapStateToProps, null)(StatusWindow);
