import * as types from '../constants/action_types';
import { fromJS } from 'immutable';

const DEF = fromJS([{battleScene: 'forest'}]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_BATTLE_SCENE: {
      return state.setIn([0], fromJS({battleScene: action.payload}));
    }
    default: {
      return state;
    }
  }
}
