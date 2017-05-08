import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_get-turn-order';
import { fromJS } from 'immutable';

describe('turn order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([]));
  });
  it('handles SET_LIST_OF_TURN_ORDER', () => {
    const DEF = fromJS([]);
    const action = { type: types.SET_LIST_OF_TURN_ORDER, payload: 'enemy1' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy1' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([ 'enemy1' ]);
    expect(nextState).to.not.equal( 'enemy1' );
  });
  it('handles SET_LIST_OF_TURN_ORDER a second time', () => {
    const DEF = fromJS([ 'enemy1' ]);
    const action = { type: types.SET_LIST_OF_TURN_ORDER, payload: 'enemy2' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy1', 'enemy2' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([ 'enemy1', 'enemy2' ]);
    expect(nextState).to.not.equal( 'enemy1', 'enemy2' );
  });
  it('handles SET_LIST_OF_TURN_ORDER a third time', () => {
    const DEF = fromJS([ 'enemy1', 'enemy2' ]);
    const action = { type: types.SET_LIST_OF_TURN_ORDER, payload: 'enemy3' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy1', 'enemy2', 'enemy3' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([ 'enemy1', 'enemy2', 'enemy3' ]);
    expect(nextState).to.not.equal( 'enemy1', 'enemy2', 'enemy3' );
  });
  it('handles GET_NEXT_TURN_FROM_LIST', () => {
    const DEF = fromJS([ 'enemy1', 'enemy2', 'enemy3' ]);
    const action = { type: types.GET_NEXT_TURN_FROM_LIST};
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy2', 'enemy3' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal(fromJS([ 'enemy1', 'enemy2' ]));
    expect(nextState).to.not.equal(fromJS([ 'enemy1', 'enemy2', 'enemy3' ]));
    expect(nextState).to.not.equal( 'enemy1', 'enemy2' );
  });
  it('handles GET_NEXT_TURN_FROM_LIST a second time', () => {
    const DEF = fromJS([ 'enemy2', 'enemy3' ]);
    const action = { type: types.GET_NEXT_TURN_FROM_LIST};
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([ 'enemy3' ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal(fromJS([ 'enemy2', 'enemy3' ]));
    expect(nextState).to.not.equal( 'enemy1', 'enemy2' );
  });
});
