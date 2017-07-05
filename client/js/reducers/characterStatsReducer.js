import _set from 'lodash.set';

export default function (characterStats, action) {
  const character = action.character;

  return _set(characterStats, action.id, {
    accuracy: character.accuracy,
    agility: character.agility,
    classes: character.classes,
    currentHp: character.currentHp,
    currentMp: character.currentMp,
    currentPositionX: character.currentPositionX,
    currentPositionY: character.currentPositionY,
    def: character.def,
    defending: character.defending || false,
    evade: character.evade,
    exp: character.exp,
    attackerId: character.attackerId ? character.attackerId : `hero${character.id}`,
    id: action.id,
    killed: character.killed,
    magic: character.magic,
    magicAbilities: character.magicAbilities,
    maxHp: character.maxHp,
    maxMp: character.maxMp,
    name: character.name,
    str: character.str
  });
}
