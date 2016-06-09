import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

const defaultState = List([{isHeroAttacking: false}]);

export default function(state = {isHeroAttacking: false}, action) {
  switch (action.type) {
    case types.SET_HERO_ATTACKING_BOOLEAN: {
      // console.log(action.payload);
      return Object.assign({}, state, {isHeroAttacking: action.payload});
      // return [action.payload, ...state];
      // return state.merge(Map({isHeroAttacking: action.payload}));
    }
    case types.SET_HERO_ATTACKING_POS2_BOOLEAN: {
      return Object.assign({}, state, {isHeroAttackingPos2: action.payload});
    }
    default: {
      return state;
    }
  }
}
