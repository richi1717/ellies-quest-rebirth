import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEnemies, setBattleScene, getEnemySelectedTarget, setEnemyAttacking } from '../actions/index';
import classnames from 'classnames';

import '../../sass/style.scss';
import '../../sass/_enemies.scss';

class Enemies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      isAttacking: false
    };
  }

  render() {
    const enemyClass = {
      'enemy-sprites': true,
      'enemy-attack-hero1': this.state.isAttacking
    };
    return (
      <div>
        <div
          onClick={this.test.bind(this)}
          className={classnames(enemyClass) + " " + this.props.enemyClass + " enemy" + this.props.position}
        />
      </div>
    );
  }

  test() {
    const baseDmg = this.props.str + (_.ceil((this.props.str + this.props.level) / 3.2) * _.ceil((this.props.str * this.props.level) / 3.2));
    if (!this.state.isAttacking) {
      this.props.getEnemySelectedTarget('hero1', baseDmg);
      this.props.setEnemyAttacking(true);
    }
    this.setState({
      isAttacking: !this.state.isAttacking
    });
  }
}

function mapStateToProps(state) {
  return {
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEnemies, setBattleScene, getEnemySelectedTarget, setEnemyAttacking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemies);
