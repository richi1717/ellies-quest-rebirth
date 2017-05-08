import types from '../constants/actionTypes';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([false]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_MENU_RUN_SELECTED: {
      return state.setIn([0], action.payload);
    }
    case types.SET_MENU_ATTACK_SELECTED: {
      return state.setIn([0], false);
    }
    default: {
      return state;
    }
  }
}
