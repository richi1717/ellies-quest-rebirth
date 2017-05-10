import React from 'react';
// import Character from '../components/Character';
import Character from '../containers/CharacterSelection';
import BattleScene from './BattleScene';
import Enemies from '../containers/EnemySelection';
import StatusWindow from './StatusWindow';
import TimeOutHandler from './time-out';
import BattleMenuTurn from './BattleMenuTurn';
import BattleMenuAttack from './BattleMenuAttack';
import BattleMenuItems from './BattleMenuItem';

export default function App(props) {
  return (
    <div className="ellies-quest-rebirth-container">
      <BattleScene {...props}>
        <div className="battle-scene-container">
          <Enemies {...props} />
          <Character />
          {/*<TimeOutHandler />*/}
        </div>
        <StatusWindow />
        {/*<BattleMenuTurn />*/}
        {/*<BattleMenuAttack />*/}
        {/*<BattleMenuItems />*/}
      </BattleScene>
    </div>
  );
}
