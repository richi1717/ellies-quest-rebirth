import { expect } from 'chai';
import * as types from '../src/constants/action_types';
import reducer from '../src/reducers/reducer_battle-scene';
import { fromJS } from 'immutable';

describe('battle scene reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(fromJS([{ battleScene: 'forest' }]));
  });
  it('handles SET_BATTLE_SCENE', () => {
    const DEF = fromJS([{ battleScene: 'forest' }]);
    const action = { type: types.SET_BATTLE_SCENE, payload: 'Forest' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{ battleScene: 'Forest' }]));
    expect(nextState).to.not.equal(fromJS([{ battleScene: 'forest' }]));
    expect(nextState).to.not.equal([{ battleScene: 'forest' }]);
    expect(nextState).to.not.equal({ battleScene: 'forest' });
  });
  it('handles SET_BATTLE_SCENE', () => {
    const DEF = fromJS([{ battleScene: 'forest' }]);
    const action = { type: types.SET_BATTLE_SCENE, payload: 'desert' };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([{ battleScene: 'desert' }]));
    expect(nextState).to.not.equal(fromJS([{ battleScene: 'forest' }]));
    expect(nextState).to.not.equal(fromJS([{ battleScene: 'forest' }]));
    expect(nextState).to.not.equal([{ battleScene: 'forest' }]);
    expect(nextState).to.not.equal({ battleScene: 'forest' });
  });
});
