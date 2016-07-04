import { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_get-menu-defend-selected';
import { fromJS } from 'immutable';

describe('menu defend selected reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([false, false, false]));
  });
  it('handles SET_MENU_DEFEND_SELECTED', () => {
    const DEF = fromJS([false, false, false]);
    const action = { type: types.SET_MENU_DEFEND_SELECTED, payload: true, id: 0 };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([true, false, false]));
    expect(nextState).to.not.equal(fromJS([ false ]));
    expect(nextState).to.not.equal([ true ]);
    expect(nextState).to.not.equal( true );
  });
});
