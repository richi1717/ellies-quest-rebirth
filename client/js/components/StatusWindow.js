import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

function StatusWindow(props) {
  function showStatusPerCharacter() {
    const STATUS = [];
    let incr = 0;

    props.heroStats.map((h) => {
      incr++;
      const HP_PERCENTAGE = Math.ceil((h.currentHp / h.maxHp) * 100);
      const MP_PERCENTAGE = Math.ceil((h.currentMp / h.maxMp) * 100);
      const LOW_HEALTH = {
        'low-health': HP_PERCENTAGE <= 25
      };
      const LOW_MAGIC = {
        'low-magic': MP_PERCENTAGE <= 25
      };
      const STYLE_HP = {
        width: `${HP_PERCENTAGE}%`
      };
      const STYLE_MP = {
        width: `${MP_PERCENTAGE}%`
      };
      STATUS.push(
        <tr key={incr}>
          <td className={`health-bar ${classnames(LOW_HEALTH)}`}>{h.currentHp}/{h.maxHp}<div><span style={STYLE_HP} /></div></td>
          <td className={`magic-bar ${classnames(LOW_MAGIC)}`}>{h.currentMp}/{h.maxMp}<div><span style={STYLE_MP} /></div></td>
        </tr>
      );
    });
    return STATUS;
  }

  function renderNames() {
    const STATUS = [];
    let incr = 0;

    props.heroStats.map((h) => {
      incr++;
      STATUS.push(
        <tr key={incr}>
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

StatusWindow.propTypes = {
  heroStats: PropTypes.array,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    heroStats: state.characterStats
  };
}

export default connect(mapStateToProps)(StatusWindow);
