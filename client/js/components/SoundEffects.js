import React from 'react';
import musicLocation from '../constants/musicLocation';

function soundFXFactory(type) {
  const builder = () => (
    <audio
      src={`/resources/music/${musicLocation[type]}`}
      name="media"
      type="audio/mpeg"
      controls
      autoPlay
    />
  );

  builder.displayName = type;

  return builder;
}

export const EnemyAttackFX = soundFXFactory('EnemyAttackFX');
export const HeroAttackFX = soundFXFactory('HeroAttackFX');
export const NormalBattleMusic = soundFXFactory('NormalBattleMusic');
export const BattleVictoryMusic = soundFXFactory('BattleVictoryMusic');
export const FireMagicFX = soundFXFactory('FireMagicFX');
export const CureMagicFX = soundFXFactory('CureMagicFX');
export const CursorMovementFX = soundFXFactory('CursorMovementFX');
export const LightningMagicFX = soundFXFactory('LightningMagicFX');
export const BossBattleMusicPart1 = soundFXFactory('BossBattleMusicPart1');
export const BossBattleMusicPart2 = soundFXFactory('BossBattleMusicPart2');
export const GameOverMusic = soundFXFactory('GameOverMusic');
export const IntroMusic = soundFXFactory('IntroMusic');
export const OverworldMusic = soundFXFactory('OverworldMusic');
