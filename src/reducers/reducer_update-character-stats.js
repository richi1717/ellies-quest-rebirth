import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

export default function(state = fromJS([]), action) {
  switch (action.type) {
    case types.UPDATE_CHARACTER_STATS: {
      const character = action.payload;
      return state.setIn([action.id], fromJS({
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
        refName: character.battleName
      }));
    }
    default: {
      return state;
    }
  }
}
