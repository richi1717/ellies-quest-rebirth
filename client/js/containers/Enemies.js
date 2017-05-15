import React, { Component, PropTypes } from 'react';
import _filter from 'lodash.filter';
import _sampleSize from 'lodash.samplesize';
import _random from 'lodash.random';
import _forEach from 'lodash.foreach';
import types from '../constants/actionTypes';
import { DATA_BASE_URL_MONSTERS } from '../constants/databaseUrls';
import Enemy from '../components/Enemy';
import dispatch from '../dispatch';

export default class Enemies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  componentWillMount() {
    const url = `${DATA_BASE_URL_MONSTERS}`;
    this.serverRequest = fetch(url)
      .then(response => response.json())
      .then(data => {
        this.chooseEnemies(data);
        this.setState({ done: true });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  chooseEnemies(enemies) {
    const areaEnemies = _filter(enemies, { sections: [this.props.battleScene] });
    const ranEnemy = _sampleSize(areaEnemies, _random(1, 5));

    _forEach(ranEnemy, (enemy, id) => {
      dispatch({
        type: types.UPDATE_ENEMY_STATS,
        enemy,
        id
      });
    });
  }

  renderEnemies(enemies) {
    const enemiesArray = [];
    let incr = 0;

    _forEach(enemies, (enemy) => {
      incr++;
      enemiesArray.push(
        <Enemy position={incr} key={incr} {...enemy} />
      );
    });

    return enemiesArray;
  }

  render() {
    return (
      <div className="enemies-container">
        {this.state.done ? this.renderEnemies(this.props.state.enemyStats) : null}
      </div>
    );
  }
}

Enemies.propTypes = {
  battleScene: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
