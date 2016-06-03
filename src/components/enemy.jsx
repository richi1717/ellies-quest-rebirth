import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEnemies, setBattleScene, getEnemySelectedTarget, setEnemyAttacking } from '../actions/index';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

import '../../sass/style.scss';
import '../../sass/_enemies.scss';

@autobind
class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      isAttacking: false
    };
  }

  handleTest() {
    const baseDmg = this.props.str + (_.ceil((this.props.str + this.props.level) / 3.2) * _.ceil((this.props.str * this.props.level) / 3.2));
    if (!this.state.isAttacking) {
      this.props.getEnemySelectedTarget('hero1', baseDmg);
      this.props.setEnemyAttacking(true);
    }
    this.setState({
      isAttacking: true
    });
    setTimeout(() => {
      this.setState({
        isAttacking: false
      });
    }, 750);
  }

  setMusic() {
    return (
      <audio
        controls name="media"
        src="/resources/music/swipe.mp3"
        autoPlay
        type="audio/mpeg"
      />
    );
  }

  render() {
    const enemyClass = {
      'enemy-sprites': true,
      'enemy-attack-hero1': this.state.isAttacking
    };
    return (
      <div>
      <div
      onClick={this.handleTest}
      className={classnames(enemyClass) + " " + this.props.enemyClass + " enemy" + this.props.position}
      />
      {this.state.isAttacking ? this.setMusic() : null}
      </div>
    );
  }
}

Enemy.propTypes = {
  str: PropTypes.number,
  level: PropTypes.number,
  getEnemySelectedTarget: PropTypes.func,
  setEnemyAttacking: PropTypes.func,
  enemyClass: PropTypes.string,
  position: PropTypes.number
};

function mapStateToProps(state) {
  return {
    isEnemyAttacking: state.get('isEnemyAttacking').get('isEnemyAttacking')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEnemies, setBattleScene, getEnemySelectedTarget, setEnemyAttacking }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
