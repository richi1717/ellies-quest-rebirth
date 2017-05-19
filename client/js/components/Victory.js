import React from 'react';
import { battleVictoryMusic } from './SoundEffects';

export default function Victory() {
  battleVictoryMusic();
  return (
    <div style={{ color: 'black' }}>
      You Win!!!!!!!
    </div>
  );
}
