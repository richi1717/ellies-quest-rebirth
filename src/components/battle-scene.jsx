import React, { Component , PropTypes} from 'react';
import { connect } from 'react-redux';
import { NormalBattleMusic } from '../utils/sound-fx';

import '../../sass/_battle-backgrounds.scss';

class BattleScene extends Component {
  render() {
    return (
      <div className={this.props.battleScene + "-battle battle"}>
        <NormalBattleMusic />
        {this.props.children}
      </div>
    );
  }
}

BattleScene.propTypes = {
  battleScene: PropTypes.string,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    battleScene: state.get('battleScene').toJS()[0].battleScene
  };
}

export default connect(mapStateToProps, null)(BattleScene);
