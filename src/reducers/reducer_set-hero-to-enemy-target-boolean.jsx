import * as types from '../constants/action_types';
import { List, Map } from 'immutable';

const defaultState = [
  Map({ id: 0, attacking: false }),
  Map({ id: 1, attacking: false }),
  Map({ id: 2, attacking: false }),
  Map({ id: 3, attacking: false }),
  Map({ id: 4, attacking: false })
];

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.SET_HERO_TO_ENEMY_TARGET: {
      // return state.map((oldState) => {
      //   if (action.targetNum === oldState.id) {
      //     return {...oldState, attacking: action.payload};
      //   }
      //   console.log(oldState);
      //   return oldState;
      // });
      return state.map(a => {
        if(a.get('id') === action.targetNum) {
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
