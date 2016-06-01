import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case types.UPDATE_CHARACTER_STATS: {
      const character = action.payload;
      return state.merge(Map({
        maxHp: character.maxHp,
        currentHp: character.currentHp,
        id: character.id,
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
        refName: character.battleName
      }));
    }
  }
  return state;
}
