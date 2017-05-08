import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([false, false, false]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_MENU_DEFEND_SELECTED: {
      return state.setIn([action.id], action.payload);
    }
    default: {
      return state;
    }
  }
}
