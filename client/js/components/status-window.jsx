import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { autobind } from 'core-decorators';
// import axios from 'axios';
// import { fetchCharacters, setBattleScene, setEnemyAttacking, updateCharacterStats, ROOT_URL } from '../actions/index';
import classnames from 'classnames';
import PureComponent from './pure-component';

import '../../../sass/_menu.scss';

@autobind
class StatusWindow extends PureComponent {
  showStatusPerCharacter() {
    const STATUS = [];
    this.props.heroStats.map((h, idx) => {
      const HP_PERCENTAGE = Math.ceil((h.currentHp / h.maxHp) * 100);
      const MP_PERCENTAGE = Math.ceil((h.currentMp / h.maxMp) * 100);
      const LOW_HEALTH = {
        'low-health': HP_PERCENTAGE <= 25
      };
      const LOW_MAGIC = {
        'low-magic': MP_PERCENTAGE <= 25
      };
      const STYLE_HP = {
        width: HP_PERCENTAGE + '%'
      };
      const STYLE_MP = {
        width: MP_PERCENTAGE + '%'
      };
      STATUS.push(
        <tr key={idx}>
          <td className={"health-bar " + classnames(LOW_HEALTH)}>{h.currentHp}/{h.maxHp}<div><span style={STYLE_HP}></span></div></td>
          <td className={"magic-bar " + classnames(LOW_MAGIC)}>{h.currentMp}/{h.maxMp}<div><span style={STYLE_MP}></span></div></td>
        </tr>
      );
    });
    return STATUS;
  }

  renderNames() {
    const STATUS = [];
    this.props.heroStats.map((h, idx) => {
      STATUS.push(
        <tr key={idx}>
          <td className="menu-select character">{h.name}</td>
        </tr>
      );
    });
    return STATUS;
  }

  render() {
    return (
      <div className="battle-menu-container">
        <div className="battle-menu-main">
        <table>
          <tbody>
            <tr>
              <th>NAME</th>
            </tr>
          </tbody>
          <tbody>
            {this.renderNames()}
          </tbody>
        </table>
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
  const c = state.get('updateCharacterStats').toJS();
  return {
    heroStats: c
  };
}

export default connect(mapStateToProps, null)(StatusWindow);
