import { expect } from 'chai';
import baseDmg from '../../src/utils/base-damage';

describe('base damage helper function', () => {
  it('sets the base damage amount from the strength and level passed in', () => {
    const STR = 20;
    const LVL = 10;

    expect(baseDmg(STR, LVL)).to.equal(650);
  });
  it('sets the base damage amount from the strength and level passed in a second time', () => {
    const STR = 10;
    const LVL = 5;

    expect(baseDmg(STR, LVL)).to.equal(90);
  });
});
