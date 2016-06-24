import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEFAULT = fromJS([{
  maxHp: 0,
  currentHp: 1,
  id: 0,
  maxMp: 0,
  currentMp: 0,
  name: 0,
  agility: 0,
  accuracy: 0,
  str: 0,
  magic: 0,
  exp: 0,
  def: 0,
  evade: 0,
  classes: 0,
  refName: 0,
  items: 0
}]);

export default function(state = DEFAULT, action) {
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
        refName: character.battleName,
        items: character.items
      }));
    }
    default: {
      return state;
    }
  }
}
