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
      isBackgroundMusicOn: { data: false },
      whoIsAttacking: { attacker: 'hero1', target: 'monster2', typeOfAttack: 'attack' },
      battleMenuAction: { selection: 'run', hero: '1' }
    };
    newState = {
      enemyInfo: { data: '' },
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: true },
      whoIsAttacking: { attacker: 'hero2', target: '', typeOfAttack: 'magic' },
      battleMenuAction: { selection: 'defend', hero: '2' }
    };
  });

  test('defaults > should return defaults by default', () => {
    expect(rootReducer(undefined, {})).toEqual({
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: false },
      whoIsAttacking: { attacker: '', target: '', typeOfAttack: '' },
      battleMenuAction: { selection: '', hero: '' }
    });
  });

  test('no action > should return current state', () => {
    expect(rootReducer(oldState, { type: '' })).toEqual(oldState);
  });

  test('USER_LOGOUT > should return defaults', () => {
    expect(rootReducer(oldState, { type: types.USER_LOGOUT })).toEqual({
      characterStats: [],
      enemyStats: [],
      isBackgroundMusicOn: { data: false },
      whoIsAttacking: { attacker: '', target: '', typeOfAttack: '' },
      battleMenuAction: { selection: '', hero: '' }
    });
  });

  test('BACKGROUND_MUSIC_SWITCH > should update isBackgroundMusicOn', () => {
    expect(rootReducer(oldState, {
      type: types.BACKGROUND_MUSIC_SWITCH,
      isBackgroundMusicOn: true
    })).toEqual({
      characterStats: oldState.characterStats,
      enemyStats: oldState.enemyStats,
      isBackgroundMusicOn: { data: true },
      whoIsAttacking: oldState.whoIsAttacking,
      battleMenuAction: oldState.battleMenuAction
    });
  });

  test('SET_BATTLE_MENU_ACTION > should update battleMenuAction', () => {
    expect(rootReducer(oldState, {
      type: types.SET_BATTLE_MENU_ACTION,
      selection: 'defend',
      hero: '2'
    })).toEqual({
      characterStats: oldState.characterStats,
      enemyStats: oldState.enemyStats,
      isBackgroundMusicOn: { data: false },
      whoIsAttacking: oldState.whoIsAttacking,
      battleMenuAction: newState.battleMenuAction
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
