import '../../sass/_battle-backgrounds.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BattleScene extends Component {
  render() {
    return (
      <div className={this.props.battleScene + "-battle battle"}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    battleScene: state.get('battleScene').get('battleScene')
  };
}

export default connect(mapStateToProps, null)(BattleScene);
