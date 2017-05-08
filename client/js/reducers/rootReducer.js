import types from '../constants/actionTypes';
import characterStatsReducer from './characterStatsReducer';

const defaults = {
  battleScene: { data: 'forest' },
  enemyInfo: { data: '' },
  characterStats: {
    maxHp: 0,
    currentHp: 1,
    id: 0,
    maxMp: 0,
    currentMp: 0,
    name: 0,
    agility: 0,
    accuracy: 0,
    str: 0,
    magic: 0,
    exp: 0,
    def: 0,
    evade: 0,
    classes: 0,
    killed: false
  }
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