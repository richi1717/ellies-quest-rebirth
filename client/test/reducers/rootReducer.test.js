import types from '../../js/constants/actionTypes';
import rootReducer from '../../js/reducers/rootReducer';

describe('rootReducer', () => {
  let oldState;
  let newState;

  beforeEach(() => {
    oldState = {
      enemyInfo: { data: '' },
      characterStats: [
        {
          userId: 1,
          name: 'Link',
          battleName: 'hero0',
          classes: 'red-boy',
          str: 20,
          def: 16,
          exp: 0,
          maxMp: 30,
          currentMp: 30,
          maxHp: 350,
          currentHp: 150,
          accuracy: 10,
          magic: 10,
          evade: 6,
          agility: 11,
          currentPositionX: 13,
          currentPositionY: 3,
          id: 0,
          inPlay: true,
          killed: false
        },
        {
          userId: 1,
          name: 'Ellie',
          battleName: 'hero1',
          classes: 'white-girl',
          magicAbilities: [
            'Cure1',
            'Fire1',
            'Lightning1'
          ],
          magic: 19,
          str: 11,
          def: 10,
          exp: 0,
          maxMp: 50,
          currentMp: 50,
          maxHp: 219,
          currentHp: 219,
          accuracy: 8,
          evade: 6,
          agility: 9,
          id: 1,
          inPlay: true,
          killed: false
        },
        {
          userId: 1,
          name: 'Luke',
          battleName: 'hero2',
          classes: 'green-boy',
          magicAbilities: [
            'Cure1',
            'Fire1',
            'Lightning1'
          ],
          magic: 19,
          str: 11,
          def: 10,
          exp: 0,
          maxMp: 50,
          currentMp: 50,
          maxHp: 219,
          currentHp: 219,
          accuracy: 8,
          evade: 6,
          agility: 13,
          id: 2,
          inPlay: true,
          killed: false
        }
      ]
    };
    newState = {
      enemyInfo: { data: '' },
      characterStats: [
        {
          userId: 1,
          name: 'Link',
          battleName: 'hero0',
          classes: 'red-boy',
          str: 20,
          def: 20,
          exp: 20,
          maxMp: 20,
          currentMp: 20,
          maxHp: 20,
          currentHp: 20,
          accuracy: 20,
          magic: 20,
          evade: 20,
          agility: 20,
          currentPositionX: 20,
          currentPositionY: 20,
          id: 0,
          inPlay: true,
          killed: false
        },
        {
          userId: 1,
          name: 'Ellie',
          battleName: 'hero1',
          classes: 'white-girl',
          magicAbilities: [
            'Cure1',
            'Fire1',
            'Lightning1'
          ],
          magic: 30,
          str: 30,
          def: 30,
          exp: 30,
          maxMp: 30,
          currentMp: 30,
          maxHp: 30,
          currentHp: 30,
          accuracy: 30,
          evade: 30,
          agility: 30,
          id: 1,
          inPlay: true,
          killed: true
        },
        {
          userId: 1,
          name: 'Luke',
          battleName: 'hero2',
          classes: 'green-boy',
          magicAbilities: [
            'Cure1',
            'Fire1',
            'Lightning1'
          ],
          magic: 40,
          str: 40,
          def: 40,
          exp: 40,
          maxMp: 40,
          currentMp: 40,
          maxHp: 40,
          currentHp: 40,
          accuracy: 40,
          evade: 40,
          agility: 40,
          id: 2,
          inPlay: true,
          killed: true
        }
      ]
    };
  });

  test('defaults > should return defaults by default', () => {
    expect(rootReducer(undefined, {})).toEqual({
      enemyInfo: { data: '' },
      characterStats: [{}, {}, {}]
    });
  });
  //
  // test('no action > should return current state', () => {
  //   expect(rootReducer(oldState, {})).toEqual(oldState);
  // });

  test('USER_LOGOUT > should return defaults', () => {
    expect(rootReducer(oldState, { type: types.USER_LOGOUT })).toEqual({
      enemyInfo: { data: '' },
      characterStats: [{}, {}, {}]
    });
  });

  test('UPDATE_CHARACTER_STATS > should update just characterStats', () => {
    expect(rootReducer(oldState, { type: types.UPDATE_CHARACTER_STATS, character: newState.characterStats[0], id: 0 }))
      .toEqual({
        enemyInfo: { data: '' },
        characterStats: [newState.characterStats[0], oldState.characterStats[1], oldState.characterStats[2]]
      });
  });
});
