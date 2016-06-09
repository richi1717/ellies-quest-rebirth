import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const defaultState = List([]);

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.GET_NEXT_TURN_FROM_LIST: {
      // console.log(state.toArray(), action.payload);
      return state.setIn([0], action.payload);
      // return state.merge(List([action.payload]));
    }
    default: {
      return state;
    }
  }
}
