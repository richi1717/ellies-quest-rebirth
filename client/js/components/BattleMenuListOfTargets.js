import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class BattleMenuListOfTargets extends Component {
  getRenderedListOfCharacters() {
    const { battleMenuAction, characterStats } = this.props.state;
    const { selection } = battleMenuAction;
    const heroNames = [];
    const heroClasses = {
      'menu-select': true,
      'attack-character': selection !== 'items'
    };

    characterStats.map(hero => {
      if (!hero.killed || selection === 'items' || selection === 'magic') {
        heroNames.push(
          <li key={hero.attackerId}>
            <button
              onClick={() => this.dispatchClickEvent(hero.attackerId)}
              className={classnames(heroClasses)}
            >
              {hero.name}
            </button>
          </li>
        );
      }
    });

    return heroNames;
  }

  getRenderedListOfEnemies() {
    const { enemyStats } = this.props.state;
    const enemyNames = [];

    enemyStats.map(enemy => {
      if (!enemy.killed) {
        enemyNames.push(
          <li key={enemy.attackerId}>
            <button
              onClick={() => this.dispatchClickEvent(enemy.attackerId)}
              className="menu-select"
            >
              {enemy.name}
            </button>
          </li>
        );
      }
    });

    return enemyNames;
  }

  dispatchClickEvent(id) {
    document.getElementById(id).click();
  }

  isMoreThanFive() {
    const { enemyStats, characterStats } = this.props.state;
    const enemyLength = enemyStats.length;
    const heroLength = characterStats.length;
    return (heroLength === 1 && enemyLength > 4)
        || (heroLength === 2 && enemyLength > 3)
        || (heroLength === 3 && enemyLength > 2);
  }

  render() {
    const { selection } = this.props.state.battleMenuAction;
    const areItemsSelected = selection === 'items';
    const menuAttackClasses = {
      'battle-menu-turn': true,
      'menu-attack': true,
      'sub-menu': true,
      'more-than-five': !!this.isMoreThanFive(),
      'menu-items-select': areItemsSelected
    };
    if (selection && (selection !== 'run' && selection !== 'defend')) {
      if (this.isMoreThanFive()) {
        return (
          <div label="yeah" className={classnames(menuAttackClasses)}>
            <div>
              {areItemsSelected ? this.getRenderedListOfCharacters() : this.getRenderedListOfEnemies()}
            </div>
            <div>
              {areItemsSelected ? this.getRenderedListOfEnemies() : this.getRenderedListOfCharacters()}
            </div>
          </div>
        );
      }

      return (
        <div className={classnames(menuAttackClasses)}>
          <div>
            {areItemsSelected ? this.getRenderedListOfCharacters() : this.getRenderedListOfEnemies()}
            {areItemsSelected ? this.getRenderedListOfEnemies() : this.getRenderedListOfCharacters()}
          </div>
        </div>
      );
    }

    return null;
  }
}

BattleMenuListOfTargets.propTypes = {
  state: PropTypes.object.isRequired
};
