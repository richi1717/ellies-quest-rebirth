import types from '../constants/actionTypes';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([false]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_MENU_ITEMS_SELECTED: {
      return state.setIn([0], action.payload);
    }
    default: {
      return state;
    }
  }
}
