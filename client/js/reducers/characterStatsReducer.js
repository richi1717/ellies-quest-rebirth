import types from '../constants/actionTypes';

export default function(characterStats, action) {
  switch (action.type) {
    case types.UPDATE_CHARACTER_STATS: {
      const character = action.character;
      return characterStats.map(stats => {
        if (stats === characterStats[action.id]) {
          return Object.assign({}, stats, {
            maxHp: character.maxHp,
            currentHp: character.currentHp,
            id: action.id,
            maxMp: character.maxMp,
            currentMp: character.currentMp,
            name: character.name,
            agility: character.agility,
            accuracy: character.accuracy,
            str: character.str,
            magic: character.magic,
            exp: character.exp,
            def: character.def,
            evade: character.evade,
            classes: character.classes,
            killed: character.killed
          });
        } else {
          return stats;
        }
      });
    }
    default: {
      return characterStats;
    }
  }
}
