import React, { Component } from 'react';
import { connect } from 'react-redux';
// import dispatch from '../dispatch';
// import { setMenuAttackSelected } from '../actions/actionCreators';
import classnames from 'classnames';

class BattleMenuAttack extends Component {
  getRenderedListOfCharacters() {
    const ARR = [];
    const CLASSES = {
      'menu-select': true,
      'attack-character': !this.props.isItemSelected
    };
    for (const KEY in this.props.heroStats) {
      const HERO = this.props.heroStats[KEY];
      if (!HERO.killed) {
        ARR.push(
          <li key={KEY}>
            <button onClick={() => this.dispatchClickEvent(`hero${KEY}`)} className={classnames(CLASSES)}>
              {HERO.name}
            </button>
          </li>
        );
      }
    }
    return ARR;
  }

  getRenderedListOfEnemies() {
    const ARR = [];
    for (const KEY in this.props.enemyStats) {
      if (!this.props.enemyStats[KEY].killed) {
        ARR.push(
          <li key={KEY}>
            <button onClick={() => this.dispatchClickEvent(`enemy${KEY}`)} className={`menu-select ${this.props.target}-position`}>
              {this.props.enemyStats[KEY].name}
            </button>
          </li>
        );
      }
    }
    return ARR;
  }

  dispatchClickEvent(id) {
    document.getElementById(id).click();
  }

  isMoreThanFive() {
    return (this.props.amountOfEnemies > 4 && this.props.amountOfCharacters === 1)
        || (this.props.amountOfEnemies > 3 && this.props.amountOfCharacters === 2)
        || (this.props.amountOfEnemies > 2 && this.props.amountOfCharacters === 3);
  }

  render() {
    const CLASSES = {
      'battle-menu-turn': true,
      'menu-attack': true,
      'sub-menu': true,
      'more-than-five': !!this.isMoreThanFive(),
      'menu-items-select': this.props.isItemSelected
    };
    const INLINE_STYLE = {
      display: 'none'
    };
    if (this.props.isMenuAttackSelected || this.props.isItemSelected) {
      if (this.isMoreThanFive()) {
        return (
          <div label="yeah" className={classnames(CLASSES)}>
            <div>
              {this.props.isItemSelected ? this.getRenderedListOfCharacters() : this.getRenderedListOfEnemies()}
            </div>
            <div>
              {this.props.isItemSelected ? this.getRenderedListOfEnemies() : this.getRenderedListOfCharacters()}
            </div>
            {this.props.children}
          </div>
        );
      }

      return (
        <div className={classnames(CLASSES)}>
          <div>
            {this.props.isItemSelected ? this.getRenderedListOfCharacters() : this.getRenderedListOfEnemies()}
            {this.props.isItemSelected ? this.getRenderedListOfEnemies() : this.getRenderedListOfCharacters()}
          </div>
          {this.props.children}
        </div>
      );
    }

    return <span style={INLINE_STYLE} />;
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(BattleMenuAttack);
