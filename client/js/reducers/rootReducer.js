import types from '../constants/actionTypes';
import characterStatsReducer from './characterStatsReducer';

const defaults = {
  battleScene: { data: 'forest' },
  enemyInfo: { data: '' },
  characterStats: [{}, {}, {}]
};

export default function rootReducer(state = defaults, action) {
  switch (action.type) {
    case types.USER_LOGOUT:
      return Object.assign({}, defaults);
    case types.SET_BATTLE_SCENE:
      return Object.assign({}, state, { battleScene: { data: action.battleScene } });
    case types.GET_ENEMY_INFO:
      return Object.assign({}, state, { enemyInfo: { data: action.enemyInfo } });
    case types.UPDATE_CHARACTER_STATS:
      return Object.assign({}, state, { characterStats: characterStatsReducer(state.characterStats, action) });
    default:
      return state;
  }
}