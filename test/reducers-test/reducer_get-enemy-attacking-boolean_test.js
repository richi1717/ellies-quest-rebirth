import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_get-enemy-attacking-boolean';
import { fromJS } from 'immutable';

describe('enemy attacking boolean reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([false]));
  });
  it('handles SET_ENEMY_ATTACKING_BOOLEAN', () => {
    const DEF = fromJS([false]);
    const action = { type: types.SET_ENEMY_ATTACKING_BOOLEAN, payload: true };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([true]));
    expect(nextState).to.not.equal(fromJS([ false ]));
    expect(nextState).to.not.equal([ true ]);
    expect(nextState).to.not.equal( true );
  });
});
