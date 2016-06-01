import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEnemies, setBattleScene, ROOT_URL } from '../actions/index';
import Enemy from './enemies';
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
}

function mapStateToProps(state) {
  return {
    en: 'en'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEnemies, setBattleScene }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemies);
