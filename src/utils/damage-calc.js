import _ from 'lodash';

export function damageCalculation(power, def, base) {
  return _.ceil(((power * (512 - def) * base) / (1.6 * 512)) * (_.random(8, 14) / 10));
}
export function getBaseDamage(str, lvl) {
  return (str + ((str + lvl) / 3.2) * ((str * lvl) / 3.2));
}
