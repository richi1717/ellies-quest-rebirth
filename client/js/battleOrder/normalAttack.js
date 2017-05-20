import dispatch, { getState } from '../dispatch';
import types from '../constants/actionTypes';
import damageCalculation from '../helpers/damageCalc';

function completePhase(enemy, id) {
  setTimeout(() => {
    dispatch({
      type: types.END_HERO_TURN,
      enemy,
      id
    });
  }, 1500);
}

function enemyKilledFadeOut(e, enemy, id) {
  const element = e;
  element.style.opacity = 1;
  element.style.display = 'block';
  completePhase(enemy, id);

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
  const hero = characterStats[attacker.split('hero')[1] - 1];
  const dmg = damageCalculation(hero, enemyCopy);
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

    enemyKilledFadeOut(element, enemyCopy, index);
  } else {
    completePhase(enemyCopy, index);
  }
}

export default function attack(target) {
  const state = getState();
  const { enemyStats, characterStats, whoIsAttacking } = state;
  const index = target.split('enemy')[1] - 1;
  const defender = enemyStats[index];
  const { attacker } = whoIsAttacking;

  attackEnemy(target, defender, attacker, characterStats, index);
}
