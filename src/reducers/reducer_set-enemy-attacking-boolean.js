import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

const defaultState = List([false]);

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.SET_ENEMY_ATTACKING_BOOLEAN: {
      return state.setIn([0], action.payload);
    }
    default: {
      return state;
    }
  }
}
