import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case types.SET_ENEMY_SELECTED_TARGET: {
      return state.merge(Map({
        targetForAttack: action.payload.name,
        enemyStr: action.payload.str
      }));
    }
    default: {
      return state;
    }
  }
}
