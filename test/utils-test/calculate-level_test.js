import { expect } from 'chai';
import * as calc from '../../src/utils/calculate-level';

describe('calculate level helper function', () => {
  it('should calculate the level based on no experience passed to calcLevel()', () => {
    expect(calc.calcLevel(0)).to.equal(1);
  });
  it('should calculate the level based on the experience passed to calcLevel()', () => {
    expect(calc.calcLevel(200)).to.equal(1);
  });
  it('should cap the level at 100 with more than 2450250 experience passed in calcLevel()', () => {
    expect(calc.calcLevel(2450251)).to.equal(100);
  });
  it('should have the level increase with more experience', () => {
    expect(calc.calcLevel(2000)).to.equal(2);
    expect(calc.calcLevel(25000)).to.equal(10);
    expect(calc.calcLevel(30250)).to.equal(11);
    expect(calc.calcLevel(36000)).to.equal(12);
  });
});
describe('calculate experience helper function', () => {
  it('should calculate the experience based on the level passed to calcExp()', () => {
    expect(calc.calcExp(2)).to.equal(1000);
    expect(calc.calcExp(10)).to.equal(25000);
    expect(calc.calcExp(11)).to.equal(30250);
    expect(calc.calcExp(12)).to.equal(36000);
  });
});
describe('calculate experience to next level helper function', () => {
  it('should calculate the experience to next level based on the experience passed to calcExpTNL()', () => {
    expect(calc.calcExpTNL(800)).to.equal(200);
    expect(calc.calcExpTNL(24000)).to.equal(1000);
    expect(calc.calcExpTNL(0)).to.equal(1000);
    expect(calc.calcExpTNL(35999)).to.equal(1);
  });
});
