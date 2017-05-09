import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBattleScene, updateEnemyStats, ROOT_URL } from '../actions/actionCreators';
import Enemy from '../containers/enemy-container';
import classnames from 'classnames';
import _ from 'lodash';

// let enemies;

class Enemies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false
    };
  }
  //
  // componentWillMount() {
  //   const url = `${ROOT_URL}/monsters.json`;
  //   this.serverRequest = axios.get(url)
  //     .then(response => {
  //       this.enemies = response.data;
  //       this.ranEnemies = this.chooseEnemies(this.enemies);
  //       // this.props.setBattleScene('forest');
  //       this.setState({done: true});
  //     });
  // }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  chooseEnemies(x) {
    const e = [];
    const areaEnemies = _.filter(x, { sections: ['forest'] });
    for (let key = 0; key < _.random(1, 5); key++) {
      const ranEnemy = _.sample(areaEnemies);
      this.props.updateEnemyStats(ranEnemy, key);
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
      <div>
      {this.state.done ? this.ranEnemies : null}
      </div>
    );
  }
}

Enemies.propTypes = {
  setBattleScene: PropTypes.func.isRequired,
  updateEnemyStats: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setBattleScene, updateEnemyStats }, dispatch);
}

export default connect(null, mapDispatchToProps)(Enemies);
