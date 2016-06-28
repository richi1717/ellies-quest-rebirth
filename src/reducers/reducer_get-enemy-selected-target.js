import * as types from '../constants/action_types';
import { fromJS } from 'immutable';

const DEF = fromJS([{
  targetForAttack: null,
  enemyStr: null
}]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_ENEMY_SELECTED_TARGET: {
      return state.setIn([0], fromJS({
        targetForAttack: action.payload.name,
        enemyStr: action.payload.str
      }));
    }
    default: {
      return state;
    }
  }
}
