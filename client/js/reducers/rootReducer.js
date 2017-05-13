import _assign from 'lodash.assign';
import _merge from 'lodash.merge';
import types from '../constants/actionTypes';
import characterStatsReducer from './characterStatsReducer';
import enemyStatsReducer from './enemyStatsReducer';

const defaults = {
  characterStats: [],
  enemyStats: [],
  isBackgroundMusicOn: { data: false }
};

export default function rootReducer(state = defaults, action) {
  switch (action.type) {
    case types.USER_LOGOUT:
      return _assign({}, defaults);
    case types.UPDATE_CHARACTER_STATS:
      return _merge({}, state, { characterStats: characterStatsReducer(state.characterStats, action) });
    case types.UPDATE_ENEMY_STATS:
      return _merge({}, state, { enemyStats: enemyStatsReducer(state.enemyStats, action) });
    case types.BACKGROUND_MUSIC_SWITCH:
      return _assign({}, state, { isBackgroundMusicOn: { data: action.isBackgroundMusicOn } });
    default:
      return state;
  }
}
