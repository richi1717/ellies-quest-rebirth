import _set from 'lodash.set';

export default function (enemyStats, action) {
  const enemy = action.enemy;

  return _set(enemyStats, action.id, {
    accuracy: enemy.accuracy,
    agility: enemy.agility,
    attack: enemy.attack,
    classes: enemy.classes,
    currentHp: enemy.currentHp,
    currentMp: enemy.currentMp,
    def: enemy.def,
    evade: enemy.evasion,
    expOnDefeat: enemy.expOnDefeat,
    id: action.id,
    itemHeld: enemy.itemHeld,
    killed: enemy.killed,
    level: enemy.level,
    magic: enemy.magic,
    magicDef: enemy.magicDef,
    maxHp: enemy.maxHp,
    maxMp: enemy.maxMp,
    name: enemy.name,
    rareItem: enemy.rareItem,
    specialAttack: enemy.specialAttack,
    str: enemy.str,
    type: enemy.type
  });
}
