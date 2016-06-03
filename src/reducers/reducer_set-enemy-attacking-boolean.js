import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

const defaultState = Map({isEnemyAttacking: false});

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.SET_ENEMY_ATTACKING_BOOLEAN: {
      return state.merge(Map({isEnemyAttacking: action.payload}));
    }
    default: {
      return state;
    }
  }
}
