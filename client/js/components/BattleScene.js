import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NormalBattleMusic } from '../helpers/soundEffects';

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
