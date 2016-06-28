import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.GET_NEXT_TURN_FROM_LIST: {
      return state.setIn([0], action.payload);
    }
    default: {
      return state;
    }
  }
}
