import { GET_CHARACTER_INFO } from '../actions/index';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case GET_CHARACTER_INFO: {
      const character = action.payload;
      return state.merge(Map({
        'maxHp': character.maxHp,
        'currentHp': character.currentHp,
        'id': character.id,
        'maxMp': character.maxMp,
        'currentMp': character.currentMp,
        'name': character.name,
        'agility': character.agility,
        'accuracy': character.accuracy,
        'str': character.str,
        'magic': character.magic,
        'exp': character.exp,
        'def': character.def,
        'evade': character.evade,
        'classes': character.classes,
        'refName': character.battleName
      }));
    }
  }
  return state;
}
