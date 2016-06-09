import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

const defaultState = List([]);

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.SET_LIST_OF_TURN_ORDER: {
      console.log(state.toJS(), action.payload);
      // return state.merge(List(action.payload));
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
