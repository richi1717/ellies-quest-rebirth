import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function StatusWindow(props) {
  function showStatusPerCharacter() {
    const status = [];
    let incr = 0;

    props.characterStats.map((h) => {
      incr++;
      const hpPercentage = Math.ceil((h.currentHp / h.maxHp) * 100);
      const mpPercentage = Math.ceil((h.currentMp / h.maxMp) * 100);
      const lowHealth = {
        'low-health': hpPercentage <= 25
      };
      const lowMagic = {
        'low-magic': mpPercentage <= 25
      };
      status.push(
        <tr key={incr}>
          <td className={`health-bar ${classnames(lowHealth)}`}>
            {h.currentHp}/{h.maxHp}
            <div>
              <span style={{ width: `${hpPercentage}%` }} />
            </div>
          </td>
          <td className={`magic-bar ${classnames(lowMagic)}`}>
            {h.currentMp}/{h.maxMp}
            <div>
              <span style={{ width: `${mpPercentage}%` }} />
            </div>
          </td>
        </tr>
      );
    });
    return status;
  }

  function renderNames() {
    const names = [];
    let incr = 0;

    props.characterStats.map((h) => {
      incr++;
      names.push(
        <tr key={incr}>
          <td className="menu-select character">{h.name}</td>
        </tr>
      );
    });
    return names;
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
  characterStats: PropTypes.array.isRequired,
  children: PropTypes.node
};
