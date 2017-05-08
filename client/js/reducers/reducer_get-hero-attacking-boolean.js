import types from '../constants/actionTypes';
import { fromJS } from 'immutable';

const DEF = fromJS([
  { isHeroAttacking: false },
  { isHeroAttacking: false },
  { isHeroAttacking: false }
]);

export default function(state = DEF, action) {
  switch (action.type) {
    case types.SET_HERO_ATTACKING_BOOLEAN: {
      return state.setIn([action.id], { isHeroAttacking: action.payload });
    }
    case types.SET_MENU_DEFEND_SELECTED: {
      return state.setIn([action.id], { isHeroAttacking: false });
    }
    default: {
      return state;
    }
  }
}
