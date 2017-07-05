import dispatch, { getState } from '../dispatch';
import types from '../constants/actionTypes';
import { magicDamageCalculation } from '../helpers/damageCalc';

function completePhase(enemy, id, character, characterId) {
  dispatch({
    type: types.UPDATE_CHARACTER_STATS,
    character,
    id: characterId
  });
  setTimeout(() => {
    dispatch({
      type: types.END_HERO_TURN,
      enemy,
      id
    });
  }, 1500);
}

function enemyKilledFadeOut(e, enemy, id, character, characterId) {
  const element = e;
  element.style.opacity = 1;
  element.style.display = 'block';
  completePhase(enemy, id, character, characterId);

  const fade = () => {
    let val = parseFloat(element.style.opacity);

    if (!((val - 0.01) < 0)) {
      val -= 0.01;
      element.style.opacity = val;
      requestAnimationFrame(fade);
    }
  };

  fade();
}

function attackEnemy(target, enemy, attacker, characterStats, index) {
  const enemyCopy = Object.assign({}, enemy);
  const heroId = attacker.split('hero')[1] - 1;
  const hero = characterStats[heroId];
  hero.currentMp -= getState().magicType.cost;
  const dmg = magicDamageCalculation(hero, enemyCopy);
  const killed = dmg >= enemyCopy.currentHp;
  enemyCopy.currentHp -= dmg;

  dispatch({
    type: types.SET_ATTACKER_AND_TARGET,
    attacker,
    target,
    typeOfAttack: getState().whoIsAttacking.typeOfAttack
  });

  if (killed) {
    enemyCopy.currentHp = 0;
    enemyCopy.killed = killed;
    const element = document.getElementById(enemyCopy.attackerId);

    enemyKilledFadeOut(element, enemyCopy, index, hero, heroId);
  } else {
    completePhase(enemyCopy, index, hero, heroId);
  }
}

export default function magicAttack(target) {
  const state = getState();
  const { enemyStats, characterStats, whoIsAttacking } = state;
  const index = target.split('enemy')[1] - 1;
  const defender = enemyStats[index];
  const { attacker } = whoIsAttacking;

  attackEnemy(target, defender, attacker, characterStats, index);
}
