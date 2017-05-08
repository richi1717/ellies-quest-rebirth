import React from 'react';
import Character from '../components/Character';
import BattleScene from './BattleScene';
import Enemies from './EnemySelection';
import StatusWindow from './StatusWindow';
import TimeOutHandler from './time-out';
import BattleMenuTurn from './BattleMenuTurn';
import BattleMenuAttack from './BattleMenuAttack';
import BattleMenuItems from './BattleMenuItem';

import '../../sass/style.scss';

export default function App() {
  return (
    <div>
      <BattleScene>
        <div className="battle-scene-container">
          <Character />
          <Enemies />
          <TimeOutHandler />
        </div>
        <StatusWindow />
        <BattleMenuTurn />
        <BattleMenuAttack />
        <BattleMenuItems />
      </BattleScene>
    </div>
  );
}
