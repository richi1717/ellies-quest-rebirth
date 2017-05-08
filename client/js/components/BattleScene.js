import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NormalBattleMusic } from '../helpers/sound-fx';

import '../../sass/_battle-backgrounds.scss';

function BattleScene(props) {
  return (
    <div className={props.battleScene + "-battle battle"}>
      {/* <NormalBattleMusic /> */}
      {props.children}
    </div>
  );
}

BattleScene.propTypes = {
  battleScene: PropTypes.string,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    battleScene: state.battleScene.data
  };
}

export default connect(mapStateToProps)(BattleScene);
