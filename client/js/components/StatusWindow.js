import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

function StatusWindow(props) {
  function showStatusPerCharacter() {
    const STATUS = [];
    props.heroStats.map((h, idx) => {
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
          <td className={"health-bar " + classnames(LOW_HEALTH)}>{h.currentHp}/{h.maxHp}<div><span style={STYLE_HP} /></div></td>
          <td className={"magic-bar " + classnames(LOW_MAGIC)}>{h.currentMp}/{h.maxMp}<div><span style={STYLE_MP} /></div></td>
        </tr>
      );
    });
    return STATUS;
  }

  function renderNames() {
    const STATUS = [];
    props.heroStats.map((h, idx) => {
      STATUS.push(
        <tr key={idx}>
          <td className="menu-select character">{h.name}</td>
        </tr>
      );
    });
    return STATUS;
  }

  return (
    <div className="battle-menu-container">
      <div className="battle-menu-main">
        <table>
          <tbody><tr><th>NAME</th></tr></tbody>
          <tbody>{renderNames()}</tbody>
        </table>
      </div>
      <div className="battle-menu-main-stats">
        <table>
          <tbody><tr><th>HP</th><th>MP</th></tr></tbody>
          <tbody>{showStatusPerCharacter()}</tbody>
        </table>
      </div>
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    heroStats: state.characterStats
  };
}

export default connect(mapStateToProps)(StatusWindow);
