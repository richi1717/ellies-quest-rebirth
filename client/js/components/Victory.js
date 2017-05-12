import React from 'react';
import { BattleVictoryMusic } from './SoundEffects';

export default function Victory() {
  return (
    <div style={{ color: 'black' }}>
      You Win!!!!!!!
      <BattleVictoryMusic />
    </div>
  );
}
