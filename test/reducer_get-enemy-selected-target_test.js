import { expect } from 'chai';
import * as types from '../src/constants/action_types';
import reducer from '../src/reducers/reducer_get-enemy-selected-target';
import { fromJS } from 'immutable';

describe('enemy selected target reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([{
      targetForAttack: null,
      enemyStr: null
    }]));
  });
  it('handles SET_ENEMY_SELECTED_TARGET', () => {
    const DEF = fromJS([{
      targetForAttack: null,
      enemyStr: null
    }]);
    const action = { type: types.SET_ENEMY_SELECTED_TARGET, payload: { name: 'enemy', str: 20 } };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{
      targetForAttack: 'enemy',
      enemyStr: 20
    }]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal(fromJS([{
      targetForAttack: null,
      enemyStr: null
    }]));
    expect(nextState).to.not.equal([{
      targetForAttack: null,
      enemyStr: null
    }]);
    expect(nextState).to.not.equal({
      targetForAttack: null,
      enemyStr: null
    });
  });
});
