import musicLocation from '../constants/musicLocation';

function soundFXFactory(type) {
  return () => {
    const audio = new Audio(`/resources/music/${musicLocation[type]}`);
    return audio.play();
  };
}

export const enemyAttackFX = soundFXFactory('enemyAttackFX');
export const heroAttackFX = soundFXFactory('heroAttackFX');
export const normalBattleMusic = soundFXFactory('normalBattleMusic');
export const battleVictoryMusic = soundFXFactory('battleVictoryMusic');
export const fireMagicFX = soundFXFactory('fireMagicFX');
export const cureMagicFX = soundFXFactory('cureMagicFX');
export const cursorMovementFX = soundFXFactory('cursorMovementFX');
export const lightningMagicFX = soundFXFactory('lightningMagicFX');
export const bossBattleMusicPart1 = soundFXFactory('bossBattleMusicPart1');
export const bossBattleMusicPart2 = soundFXFactory('bossBattleMusicPart2');
export const gameOverMusic = soundFXFactory('gameOverMusic');
export const introMusic = soundFXFactory('introMusic');
export const overworldMusic = soundFXFactory('overworldMusic');
