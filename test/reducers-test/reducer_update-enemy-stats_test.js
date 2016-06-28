import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_update-enemy-stats';
import { fromJS } from 'immutable';

describe('update enemy stats reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([]));
  });
  it('handles UPDATE_ENEMY_STATS', () => {
    const DEF = fromJS([]);
    const OBJ = {
      id: 0,
      maxHp: 0,
      currentHp: 200,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      def: 0,
      evasion: 0,
      classes: 0,
      magicDef: 0,
      type: 0,
      attack: 0,
      specialAttack: 0,
      expOnDefeat: 0,
      itemHeld: 0,
      rareItem: 0,
      level: 0,
      killed: false
    };
    const action = { type: types.UPDATE_ENEMY_STATS, payload: OBJ, id: 0 };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{
      id: 0,
      maxHp: 0,
      currentHp: 200,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      def: 0,
      evasion: 0,
      classes: 0,
      magicDef: 0,
      type: 0,
      attack: 0,
      specialAttack: 0,
      expOnDefeat: 0,
      itemHeld: 0,
      rareItem: 0,
      level: 0,
      killed: false
    }]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([{
      id: 0,
      maxHp: 0,
      currentHp: 200,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      def: 0,
      evasion: 0,
      classes: 0,
      magicDef: 0,
      type: 0,
      attack: 0,
      specialAttack: 0,
      expOnDefeat: 0,
      itemHeld: 0,
      rareItem: 0,
      level: 0,
      killed: false
    }]);
  });
  it('handles DELETE_ENEMY_WHEN_KILLED', () => {
    const DEF = fromJS([]);
    const action = { type: types.DELETE_ENEMY_WHEN_KILLED, payload: 0 };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{ killed: true }]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([{ killed: false }]);
  });
});
