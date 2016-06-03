import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBattleScene, ROOT_URL } from '../actions/index';
import Enemy from './enemy';
import classnames from 'classnames';
import axios from 'axios';
import _ from 'lodash';

import '../../sass/style.scss';
import '../../sass/_enemies.scss';
// let enemies;

class Enemies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false
    };
  }

  componentWillMount() {
    const url = `${ROOT_URL}/monsters`;
    this.serverRequest = axios.get(url)
      .then(response => {
        this.enemies = response.data;
        this.props.setBattleScene('forest');
        this.setState({done: true});
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  chooseEnemies(x) {
    const e = [];
    const names = [];
    const areaEnemies = _.filter(x, { sections: ['forest'] });
    for (let key = 0; key < _.random(1, 5); key++) {
      const ranEnemy = _.sample(areaEnemies);
      e.push(
        <Enemy enemyClass={ranEnemy.classes} position={key + 1} key={key} {...ranEnemy}/>
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
      {this.state.done ? this.chooseEnemies(this.enemies) : null}
      </div>
    );
  }
}

Enemies.propTypes = {
  setBattleScene: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    en: 'en'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setBattleScene }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemies);
