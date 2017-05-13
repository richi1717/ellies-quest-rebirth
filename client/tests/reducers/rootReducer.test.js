import types from '../../js/constants/actionTypes';
import rootReducer from '../../js/reducers/rootReducer';
import characterStatsReducer from '../../js/reducers/characterStatsReducer';
import enemyStatsReducer from '../../js/reducers/enemyStatsReducer';

jest.mock('../../js/reducers/characterStatsReducer');
jest.mock('../../js/reducers/enemyStatsReducer');

describe('rootReducer', () => {
  let oldState;
  let newState;

  beforeEach(() => {
    oldState = {
      characterStats: [{ killed: false }],
      enemyStats: [{ yolo: true }],
      isBackgroundMusicOn: { data: false }
    };
    newState = {
      enemyInfo: { data: '' },
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: true }
    };
  });

  test('defaults > should return defaults by default', () => {
    expect(rootReducer(undefined, {})).toEqual({
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: false }
    });
  });

  test('no action > should return current state', () => {
    expect(rootReducer(oldState, { type: '' })).toEqual(oldState);
  });

  test('USER_LOGOUT > should return defaults', () => {
    expect(rootReducer(oldState, { type: types.USER_LOGOUT })).toEqual({
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: false }
    });
  });

  test('BACKGROUND_MUSIC_SWITCH > should update isBackgroundMusicOn', () => {
    expect(rootReducer(oldState, {
      type: types.BACKGROUND_MUSIC_SWITCH,
      isBackgroundMusicOn: true
    })).toEqual({
      characterStats: oldState.characterStats,
      enemyStats: oldState.enemyStats,
      isBackgroundMusicOn: { data: true }
    });
  });

  test('UPDATE_CHARACTER_STATS > should update just characterStats', () => {
    rootReducer(oldState, {
      type: types.UPDATE_CHARACTER_STATS,
      character: newState.characterStats[0],
      id: 0
    });
    expect(characterStatsReducer).toHaveBeenCalledWith(oldState.characterStats, {
      type: types.UPDATE_CHARACTER_STATS,
      character: newState.characterStats[0],
      id: 0
    });
  });

  test('UPDATE_ENEMY_STATS > should update just enemyStats', () => {
    rootReducer(oldState, {
      type: types.UPDATE_ENEMY_STATS,
      character: newState.enemyStats[0],
      id: 0
    });
    expect(enemyStatsReducer).toHaveBeenCalledWith(oldState.enemyStats, {
      type: types.UPDATE_ENEMY_STATS,
      character: newState.enemyStats[0],
      id: 0
    });
  });
});
