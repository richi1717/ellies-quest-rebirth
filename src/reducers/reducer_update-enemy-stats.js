import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case types.UPDATE_ENEMY_STATS: {
      const enemy = action.payload;
      console.log(action.payload);
      return [Map({
        id: action.id,
        maxHp: enemy.maxHp,
        currentHp: enemy.currentHp,
        maxMp: enemy.maxMp,
        currentMp: enemy.currentMp,
        name: enemy.name,
        agility: enemy.agility,
        accuracy: enemy.accuracy,
        str: enemy.str,
        magic: enemy.magic,
        def: enemy.def,
        evasion: enemy.evasion,
        classes: enemy.classes,
        magicDef: enemy.magicDef,
        type: enemy.type,
        attack: enemy.attack,
        specialAttack: enemy.specialAttack,
        expOnDefeat: enemy.expOnDefeat,
        itemHeld: enemy.itemHeld,
        rareItem: enemy.rareItem,
        level: enemy.level
      }), ...state];
    }
    default: {
      return state;
    }
  }
}
