import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_get-next-turn';
import { fromJS } from 'immutable';

describe('next turn reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([]));
  });
  it('handles GET_NEXT_TURN_FROM_LIST', () => {
    const DEF = fromJS([]);
    const action = { type: types.GET_NEXT_TURN_FROM_LIST, payload: 'enemy1' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy1' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([ 'enemy1' ]);
    expect(nextState).to.not.equal( 'enemy1' );
  });
});
