import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { autobind } from 'core-decorators';
// import axios from 'axios';
// import { fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats, ROOT_URL } from '../actions/index';
import classnames from 'classnames';
import PureComponent from './pure-component';

import '../../sass/_menu.scss';

@autobind
class StatusWindow extends PureComponent {
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
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const c = state.get('updateCharacterStats').toJS()[0] ? state.get('updateCharacterStats').toJS()[0] : state.get('updateCharacterStats').toJS();
  // console.log(c);
  // console.log(`%c${c.get('name')}`, 'color: green');
  return {
    heroMaxHp: c.maxHp,
    heroCurrentHp: c.currentHp,
    heroMaxMp: c.maxMp,
    heroCurrentMp: c.currentMp,
    heroName: c.name,
    heroStats: c
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats }, dispatch);
// }

export default connect(mapStateToProps, null)(StatusWindow);
