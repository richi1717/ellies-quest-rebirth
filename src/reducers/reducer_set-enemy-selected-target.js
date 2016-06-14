import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEFAULT = fromJS({
  targetForAttack: null,
  enemyStr: null
});

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case types.SET_ENEMY_SELECTED_TARGET: {
      return state.merge(fromJS({
        targetForAttack: action.payload.name,
        enemyStr: action.payload.str
      }));
    }
    default: {
      return state;
    }
  }
}
