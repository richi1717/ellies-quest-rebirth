import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_update-character-stats';
import { fromJS } from 'immutable';

describe('enemy selected target reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([{
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
      items: 0
    }]));
  });
  it('handles UPDATE_CHARACTER_STATS', () => {
    const DEF = fromJS([{
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
      items: 0
    }]);
    const OBJ = {
      maxHp: 0,
      currentHp: 200,
      id: 0,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      exp: 0,
      def: 0,
      evade: 0,
      classes: 0,
      items: 0
    };
    const action = { type: types.UPDATE_CHARACTER_STATS, payload: OBJ, id: 0 };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{
      maxHp: 0,
      currentHp: 200,
      id: 0,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      exp: 0,
      def: 0,
      evade: 0,
      classes: 0,
      items: 0
    }]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([{
      maxHp: 0,
      currentHp: 200,
      id: 0,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      exp: 0,
      def: 0,
      evade: 0,
      classes: 0,
      items: 0
    }]);
    expect(nextState).to.not.equal({
      maxHp: 0,
      currentHp: 200,
      id: 0,
      maxMp: 0,
      currentMp: 0,
      name: 0,
      agility: 0,
      accuracy: 0,
      str: 1,
      magic: 0,
      exp: 0,
      def: 0,
      evade: 0,
      classes: 0,
      items: 0
    });
  });
});
