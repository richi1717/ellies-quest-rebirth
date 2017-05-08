import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const DEF = fromJS([{ name: 'Health Tonic', type: 'Health Restore' }]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_ITEM_OBJECT_FROM_SELECTED: {
      return state.setIn([0], action.payload);
    }
    default: {
      return state;
    }
  }
}
