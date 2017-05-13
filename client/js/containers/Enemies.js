import React, { Component, PropTypes } from 'react';
import _filter from 'lodash.filter';
import _sampleSize from 'lodash.samplesize';
import _random from 'lodash.random';
import _forEach from 'lodash.foreach';
import types from '../constants/actionTypes';
import { DATA_BASE_URL } from '../constants/databaseUrls';
import Enemy from '../components/Enemy';
import dispatch from '../dispatch';

export default class Enemies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false
    };
  }

  componentWillMount() {
    const url = `${DATA_BASE_URL}/monsters.json`;
    this.serverRequest = fetch(url)
      .then(response => response.json())
      .then(data => {
        this.enemies = data;
        this.ranEnemies = this.chooseEnemies(this.enemies);
        this.setState({ done: true });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  chooseEnemies(x) {
    const enemies = [];
    const areaEnemies = _filter(x, { sections: [this.props.battleScene] });
    const ranEnemy = _sampleSize(areaEnemies, _random(1, 5));
    let incr = 0;

    _forEach(ranEnemy, (enemy, id) => {
      incr++;
      dispatch({
        type: types.UPDATE_ENEMY_STATS,
        enemy,
        id
      });
      enemies.push(
        <Enemy position={incr} key={incr} {...enemy} />
      );
    });

    return enemies;
  }

  render() {
    // const enemyClass = {
    //   'enemy-sprites': true,
    //   'enemy-attack-hero1': this.state.test,
    //   'enemy-green-eagle': true,
    //   enemy1: true
    // };
    return (
      <div className="enemies-container">
        {this.state.done ? this.ranEnemies : null}
      </div>
    );
  }
}

Enemies.propTypes = {
  battleScene: PropTypes.string.isRequired
};
