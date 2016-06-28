import * as types from '../constants/action_types';
import { fromJS } from 'immutable';

const DEF = fromJS([]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_LIST_OF_TURN_ORDER: {
      return state.push(action.payload);
    }
    case types.GET_NEXT_TURN_FROM_LIST: {
        return state.shift();
    }
    default: {
      return state;
    }
  }
}
