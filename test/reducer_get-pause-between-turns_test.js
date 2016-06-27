import { expect } from 'chai';
import * as types from '../src/constants/action_types';
import reducer from '../src/reducers/reducer_get-pause-between-turns';
import { fromJS } from 'immutable';

describe('pause between turns reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([false]));
  });
  it('handles SET_PAUSE_BETWEEN_TURNS', () => {
    const DEF = fromJS([false]);
    const action = { type: types.SET_PAUSE_BETWEEN_TURNS, payload: true };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([true]));
    expect(nextState).to.not.equal(fromJS([ false ]));
    expect(nextState).to.not.equal([ true ]);
    expect(nextState).to.not.equal( true );
  });
});
