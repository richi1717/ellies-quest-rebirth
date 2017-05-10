import React, { Component, PropTypes } from 'react';
import { updateEnemyStats, ROOT_URL } from '../actions/actionCreators';
import Enemy from '../components/Enemy';
import filter from 'lodash/filter';
import sample from 'lodash/sample';
import random from 'lodash/random';
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
    const url = `${ROOT_URL}/monsters.json`;
    this.serverRequest = fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.enemies = data;
        this.ranEnemies = this.chooseEnemies(this.enemies);
        this.setState({done: true});
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  chooseEnemies(x) {
    const e = [];
    const areaEnemies = filter(x, { sections: [this.props.battleScene] });
    for (let key = 0; key < random(1, 5); key++) {
      const ranEnemy = sample(areaEnemies);
      dispatch(updateEnemyStats(ranEnemy, key));
      e.push(
        <Enemy enemyClass={ranEnemy.classes} turnSpeed={ranEnemy.agility} position={key} key={key} {...ranEnemy} />
      );
    }
    return e;
  }

  render() {
    const enemyClass = {
      'enemy-sprites': true,
      'enemy-attack-hero1': this.state.test,
      'enemy-green-eagle': true,
      'enemy1': true
    };
    return (
      <div className="enemies-container">
        {this.state.done ? this.ranEnemies : null}
      </div>
    );
  }
}

Enemies.propTypes = {
  battleScene: PropTypes.string.isRequired,
  updateEnemyStats: PropTypes.func
};
