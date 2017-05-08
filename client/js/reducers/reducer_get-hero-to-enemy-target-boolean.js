import * as types from '../constants/action_types';
import { List, Map, fromJS } from 'immutable';

const defaultState = fromJS([
  { id: 0, attacking: false },
  { id: 1, attacking: false },
  { id: 2, attacking: false },
  { id: 3, attacking: false },
  { id: 4, attacking: false }
]);

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.SET_HERO_TO_ENEMY_TARGET: {
      return state.map(a => {
        if (a.get('id') === action.targetNum) {
          return a.update('attacking', attacking => action.payload);
        } else {
          return a;
        }
      });
    }
    default: {
      return state;
    }
  }
}
