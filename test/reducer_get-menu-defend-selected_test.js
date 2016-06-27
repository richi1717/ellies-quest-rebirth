import { expect } from 'chai';
import * as types from '../src/constants/action_types';
import reducer from '../src/reducers/reducer_get-menu-defend-selected';
import { fromJS } from 'immutable';

describe('menu defend selected reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([false]));
  });
  it('handles SET_MENU_DEFEND_SELECTED', () => {
    const DEF = fromJS([false]);
    const action = { type: types.SET_MENU_DEFEND_SELECTED, payload: true };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([true]));
    expect(nextState).to.not.equal(fromJS([ false ]));
    expect(nextState).to.not.equal([ true ]);
    expect(nextState).to.not.equal( true );
  });
  it('handles SET_MENU_ATTACK_SELECTED', () => {
    const DEF = fromJS([false]);
    const action = { type: types.SET_MENU_ATTACK_SELECTED, payload: true };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([false]));
    expect(nextState).to.not.equal(fromJS([ true ]));
    expect(nextState).to.not.equal([ false ]);
    expect(nextState).to.not.equal( false );
  });
});
