import React from 'react';
import PropTypes from 'prop-types';
import { NormalBattleMusic } from './SoundEffects';

export default function BattleScene(props) {
  return (
    <div className={props.battleScene + "-battle battle"}>
      {props.playMusic && <NormalBattleMusic />}
      {props.children}
    </div>
  );
}

BattleScene.propTypes = {
  battleScene: PropTypes.string,
  playMusic: PropTypes.bool,
  children: PropTypes.node
};
