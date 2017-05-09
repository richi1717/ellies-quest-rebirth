import expect from 'expect';
import * as actions from '../src/actions/actionCreators';
import types from '../src/constants/actionTypes';
import { fromJS } from 'immutable';

describe('actions', () => {
  it('should create an action to add the battle scene', () => {
    const LOCATION = 'forest';
    const expectedAction = {
      type: types.SET_BATTLE_SCENE,
      payload: LOCATION
    };
    expect(actions.setBattleScene(LOCATION)).toEqual(expectedAction);
  });
  it('should create an action to select enemy target', () => {
    const NAME = 'jar-jar';
    const STR = 1234;
    const expectedAction = {
      type: types.SET_ENEMY_SELECTED_TARGET,
      payload: { name: NAME, str: STR }
    };
    expect(actions.setEnemySelectedTarget(NAME, STR)).toEqual(expectedAction);
  });
  it('should create an action to update character stats', () => {
    const OBJ = {name: 'link', str: 200};
    const ID = 1234;
    const expectedAction = {
      type: types.UPDATE_CHARACTER_STATS,
      payload: OBJ,
      id: ID
    };
    expect(actions.updateCharacterStats(OBJ, ID)).toEqual(expectedAction);
  });
  it('should create an action to update character stats', () => {
    const OBJ = {name: 'link', str: 200};
    const ID = 1234;
    const unExpectedAction = {
      type: "",
      payload: "",
      id: ""
    };
    expect(actions.updateCharacterStats(OBJ, ID)).toNotEqual(unExpectedAction);
  });
  it('should create an action to update enemy stats', () => {
    const OBJ = {name: 'link', str: 200};
    const ID = 1234;
    const expectedAction = {
      type: types.UPDATE_ENEMY_STATS,
      payload: OBJ,
      id: ID
    };
    expect(actions.updateEnemyStats(OBJ, ID)).toEqual(expectedAction);
  });
  it('should create an action to update enemy stats', () => {
    const OBJ = {name: 'link', str: 200};
    const ID = 1234;
    const unExpectedAction = {
      type: "",
      payload: "",
      id: ""
    };
    expect(actions.updateEnemyStats(OBJ, ID)).toNotEqual(unExpectedAction);
  });
  it('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_ENEMY_ATTACKING_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setEnemyAttacking(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const unExpectedAction = {
      type: "",
      payload: ""
    };
    expect(actions.setEnemyAttacking(BOOL)).toNotEqual(unExpectedAction);
  });
  it('should create an action to update hero attacking', () => {
    const BOOL = true;
    const unExpectedAction = {
      type: "",
      payload: ""
    };
    expect(actions.setHeroAttacking(BOOL)).toNotEqual(unExpectedAction);
  });
  it('should create an action to update enemy attacking', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_ENEMY_ATTACKING_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setEnemyAttacking(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update hero attacking pos2', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_HERO_ATTACKING_POS2_BOOLEAN,
      payload: BOOL
    };
    expect(actions.setHeroAttackingPos2(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update hero attacking pos2', () => {
    const BOOL = true;
    const TARGET = 'link';
    const expectedAction = {
      type: types.SET_HERO_TO_ENEMY_TARGET,
      payload: BOOL,
      targetNum: TARGET
    };
    expect(actions.setHeroToEnemyTarget(BOOL, TARGET)).toEqual(expectedAction);
  });
  it('should create an action to update turn order', () => {
    const TARGET = 'link';
    const expectedAction = {
      type: types.SET_LIST_OF_TURN_ORDER,
      payload: TARGET
    };
    expect(actions.setListOfTurnOrder(TARGET)).toEqual(expectedAction);
  });
  it('should create an action to create a pause that will be used as a timeout between turns', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_PAUSE_BETWEEN_TURNS,
      payload: BOOL
    };
    expect(actions.setPauseBetweenTurns(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to get the next turn from the list', () => {
    const LIST = fromJS([1,2,3]);
    const NEXT = LIST.first();
    const expectedAction = {
      type: types.GET_NEXT_TURN_FROM_LIST,
      payload: NEXT,
      list: LIST
    };
    expect(actions.setNextTurnFromList(LIST)).toEqual(expectedAction);
  });
  it('should create an action to update the menu selection for attack', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_ATTACK_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuAttackSelected(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update the menu selection for defend', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_DEFEND_SELECTED,
      payload: BOOL,
      id: 0
    };
    expect(actions.setMenuDefendSelected(BOOL, 0)).toEqual(expectedAction);
  });
  it('should create an action to update the menu selection for items', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_ITEMS_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuItemsSelected(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update the menu selection for magic', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_MAGIC_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuMagicSelected(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to update the menu selection for run', () => {
    const BOOL = true;
    const expectedAction = {
      type: types.SET_MENU_RUN_SELECTED,
      payload: BOOL
    };
    expect(actions.setMenuRunSelected(BOOL)).toEqual(expectedAction);
  });
  it('should create an action to delete the enemy from the array of enemies', () => {
    const POSITION = 1;
    const expectedAction = {
      type: types.DELETE_ENEMY_WHEN_KILLED,
      payload: POSITION
    };
    expect(actions.deleteEnemyWhenKilled(POSITION)).toEqual(expectedAction);
  });
  // DON'T FEEL like this should be an action anyways!!!!! So move for later!
  // it('should create an action to delete the enemy from the array of enemies', () => {
  //   const REQ = 'give me some data from the database';
  //   const expectedAction = {
  //     type: types.GET_CHARACTER_INFO,
  //     payload: REQ
  //   };
  //   expect(actions.fetchCharacters()).toEqual(expectedAction);
  // });
})
