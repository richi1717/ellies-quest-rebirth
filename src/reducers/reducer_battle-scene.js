import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

export default function(state = Map({}), action) {
  switch (action.type) {
    case types.SET_BATTLE_SCENE: {
      return state.merge({battleScene: action.payload});
    }
    default: {
      return state;
    }
  }
}
