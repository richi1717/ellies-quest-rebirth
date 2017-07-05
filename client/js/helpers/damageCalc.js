import _random from 'lodash.random';
import { calcLevel } from '../helpers/levelCalc';

export function getBaseDamage(attacker) {
  const str = attacker.str;
  const lvl = attacker.level ? attacker.level : calcLevel(attacker.exp);

  return str + (((str + lvl) / 3.2) * ((str * lvl) / 3.2));
}

export function getBaseMagicDamage(attacker) {
  const magic = attacker.magic;
  const lvl = attacker.level ? attacker.level : calcLevel(attacker.exp);

  return magic + (((magic + lvl) / 2.8) * ((magic * lvl) / 2.8));
}

export function damageCalculation(attacker, defender) {
  const critical = _random(1, 100) % 26 === 0;
  const power = critical ? _random(2.9, 3.3) : _random(1.8, 2.7);
  const def = defender.def;
  const base = getBaseDamage(attacker);
  let dmg = Math.ceil((power * (512 - def) * base) / (1.6 * 512));
  dmg = dmg > 0 ? dmg : 1;

  return dmg;
}

export function magicDamageCalculation(attacker, defender) {
  const power = _random(4.3, 4.6);
  const def = defender.magicDef;
  const base = getBaseMagicDamage(attacker);
  let dmg = Math.ceil((power * (512 - def) * base) / (1.5 * 512));
  dmg = dmg > 0 ? dmg : 1;

  return dmg;
}
