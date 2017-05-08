import types from '../constants/actionTypes';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS(['fake0']);

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
