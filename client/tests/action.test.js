import * as actions from '../js/actions/actionCreators';
import types from '../js/constants/actionTypes';

describe('actions', () => {
  let heroLink;

  beforeEach(() => {
    heroLink = { name: 'link', str: 200 };
  });

  test('should create an action to select enemy target', () => {
    const NAME = 'jar-jar';
    const STR = 1234;
    const expectedAction = {
      type: types.SET_ENEMY_SELECTED_TARGET,
      payload: { name: NAME, str: STR }
    };
    expect(actions.setEnemySelectedTarget(NAME, STR)).toEqual(expectedAction);
  });

  test('should create an action to update enemy stats', () => {
    const ID = 1234;
    const expectedAction = {
      type: types.UPDATE_ENEMY_STATS,
      payload: heroLink,
      id: ID
    };
    expect(actions.updateEnemyStats(heroLink, ID)).toEqual(expectedAction);
  });

  test('should create an action to update enemy stats', () => {
    const ID = 1234;
    const unExpectedAction = {
      type: '',
      payload: '',
      id: ''
    };
    expect(actions.updateEnemyStats(heroLink, ID)).not.toEqual(unExpectedAction);
  });

  test('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_ENEMY_ATTACKING_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setEnemyAttacking(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const unExpectedAction = {
      type: '',
      payload: ''
    };
    expect(actions.setEnemyAttacking(BOOL)).not.toEqual(unExpectedAction);
  });

  test('should create an action to update hero attacking', () => {
    const BOOL = true;
    const unExpectedAction = {
      type: '',
      payload: ''
    };
    expect(actions.setHeroAttacking(BOOL)).not.toEqual(unExpectedAction);
  });

  test('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_ENEMY_ATTACKING_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setEnemyAttacking(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update hero attacking pos2', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_HERO_ATTACKING_POS2_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setHeroAttackingPos2(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update hero attacking pos2', () => {
    const BOOL = true;
    const TARGET = 'link';
    const expectedAction = {
      type: types.SET_HERO_TO_ENEMY_TARGET,
      payload: BOOL,
      targetNum: TARGET
    };
    expect(actions.setHeroToEnemyTarget(BOOL, TARGET)).toEqual(expectedAction);
  });

  test('should create an action to update turn order', () => {
    const TARGET = 'link';
    const expectedAction = {
      type: types.SET_LIST_OF_TURN_ORDER,
      payload: TARGET
    };
    expect(actions.setListOfTurnOrder(TARGET)).toEqual(expectedAction);
  });

  test('should create an action to create a pause that will be used as a timeout between turns', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_PAUSE_BETWEEN_TURNS,
      payload: BOOL
    };
    expect(actions.setPauseBetweenTurns(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update the menu selection for attack', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_ATTACK_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuAttackSelected(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update the menu selection for defend', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_DEFEND_SELECTED,
      payload: BOOL,
      id: 0
    };
    expect(actions.setMenuDefendSelected(BOOL, 0)).toEqual(expectedAction);
  });

  test('should create an action to update the menu selection for items', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_ITEMS_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuItemsSelected(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update the menu selection for magic', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_MAGIC_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuMagicSelected(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to update the menu selection for run', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_RUN_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuRunSelected(BOOL)).toEqual(expectedAction);
  });

  test('should create an action to delete the enemy from the array of enemies', () => {
    const POSITION = 1;
    const expectedAction = {
      type: types.DELETE_ENEMY_WHEN_KILLED,
      payload: POSITION
    };
    expect(actions.deleteEnemyWhenKilled(POSITION)).toEqual(expectedAction);
  });

  test('shouldPlayBackgroundMusic should turn on/off background music', () => {
    const expectedAction = {
      type: types.BACKGROUND_MUSIC_SWITCH,
      isBackgroundMusicOn: true
    };
    expect(actions.shouldPlayBackgroundMusic(true)).toEqual(expectedAction);
  });
});
