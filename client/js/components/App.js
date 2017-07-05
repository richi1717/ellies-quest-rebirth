import React from 'react';
// import Character from '../components/Character';
import Character from '../containers/Characters';
import BattleScene from './BattleScene';
import Enemies from '../containers/Enemies';
import StatusWindow from './StatusWindow';
// import TimeOutHandler from './time-out';
import BattleMenuTurn from './BattleMenuTurn';
import BattleMenuAttack from './BattleMenuListOfTargets';
import BattleMenuMagic from './BattleMenuMagic';
// import BattleMenuItems from './BattleMenuItem';

export default function App(props) {
  return (
    <div className="ellies-quest-rebirth-container">
      <BattleScene {...props}>
        <div className="battle-scene-container">
          <Enemies {...props} />
          <Character {...props} />
          {/*<TimeOutHandler />*/}
        </div>
        <StatusWindow {...props} />
        <BattleMenuTurn {...props} />
        <BattleMenuAttack {...props} />
        <BattleMenuMagic {...props} />
        {/*<BattleMenuItems />*/}
      </BattleScene>
    </div>
  );
}
