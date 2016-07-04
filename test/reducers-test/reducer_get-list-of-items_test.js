import chai, { expect } from 'chai';
import * as types from '../../src/constants/action_types';
import reducer from '../../src/reducers/reducer_get-list-of-items';
import { List, fromJS } from 'immutable';
var should = chai.should();

describe('get list of items reducer', () => {
  const DEF = fromJS([
    { name: 'Health Tonic', inStock: 0 },
    { name: 'Super Health Tonic', inStock: 0 }
  ]);
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(DEF);
  });
  it('handles SET_LIST_OF_ITEMS', () => {
    const action = { type: types.SET_LIST_OF_ITEMS, payload: fromJS({ name: 'Health Tonic', inStock: 10 }), id: 0 };
    const nextState = reducer(DEF, action);

    expect(nextState).to.equal(fromJS([
      { name: 'Health Tonic', inStock: 10 },
      { name: 'Super Health Tonic', inStock: 0 }
    ]));
    expect(nextState).to.not.equal(DEF);
    expect(nextState).to.not.equal([{ name: 'Health Tonic', inStock: 0 }]);
    expect(nextState).to.not.equal({ name: 'Health Tonic', inStock: 0 });
  });
});
