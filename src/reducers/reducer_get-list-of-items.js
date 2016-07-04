import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([{ name: 'Health Tonic', inStock: 0 }]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_LIST_OF_ITEMS: {
      return state.setIn([action.id], action.payload);
    }
    default: {
      return state;
    }
  }
}
