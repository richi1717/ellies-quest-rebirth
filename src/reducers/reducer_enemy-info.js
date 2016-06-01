import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case types.GET_ENEMY_INFO: {
      return state.merge(Map({enemies: action.payload}));
    }
  }
  return state;
}
