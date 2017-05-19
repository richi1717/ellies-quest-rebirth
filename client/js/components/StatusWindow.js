import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dispatch from '../dispatch';
import types from '../constants/actionTypes';

export default function StatusWindow(props) {
  function renderNames() {
    const { characterStats, whoIsAttacking } = props.state;
    const names = [];
    let incr = 0;

    characterStats.map((h) => {
      incr++;
      const selected = h.attackerId === whoIsAttacking.attacker ? 'character-turn' : '';
      names.push(
        <tr key={incr}>
          <td>
            <button
              onClick={() => dispatch({
                type: types.SET_ATTACKER_AND_TARGET,
                attacker: h.attackerId,
                target: '',
                typeOfAttack: ''
              })}
              className={`menu-select character ${selected}`}
            >{h.name}</button>
          </td>
        </tr>
      );
    });
    return names;
  }

  function showStatusPerCharacter() {
    const status = [];
    let incr = 0;

    props.state.characterStats.map((h) => {
      incr++;
      const hpPercentage = Math.ceil((h.currentHp / h.maxHp) * 100);
      const mpPercentage = Math.ceil((h.currentMp / h.maxMp) * 100);
      const lowHealth = {
        'low-health': hpPercentage <= 25,
        'health-bar': true
      };
      const lowMagic = {
        'low-magic': mpPercentage <= 25,
        'magic-bar': true
      };
      status.push(
        <tr key={incr}>
          <td className={classnames(lowHealth)}>
            {h.currentHp}/{h.maxHp}
            <div>
              <span style={{ width: `${hpPercentage}%` }} />
            </div>
          </td>
          <td className={classnames(lowMagic)}>
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
  state: PropTypes.object.isRequired,
  children: PropTypes.node
};
