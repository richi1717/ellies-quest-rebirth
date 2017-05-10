import * as calc from '../../js/helpers/calculate-level';

describe('calculate level helper function', () => {
  it('should calculate the level based on no experience passed to calcLevel()', () => {
    expect(calc.calcLevel(0)).toEqual(1);
  });
  it('should calculate the level based on the experience passed to calcLevel()', () => {
    expect(calc.calcLevel(200)).toEqual(1);
  });
  it('should cap the level at 100 with more than 2450250 experience passed in calcLevel()', () => {
    expect(calc.calcLevel(2450251)).toEqual(100);
  });
  it('should have the level increase with more experience', () => {
    expect(calc.calcLevel(2000)).toEqual(2);
    expect(calc.calcLevel(25000)).toEqual(10);
    expect(calc.calcLevel(30250)).toEqual(11);
    expect(calc.calcLevel(36000)).toEqual(12);
  });
});
describe('calculate experience helper function', () => {
  it('should calculate the experience based on the level passed to calcExp()', () => {
    expect(calc.calcExp(2)).toEqual(1000);
    expect(calc.calcExp(10)).toEqual(25000);
    expect(calc.calcExp(11)).toEqual(30250);
    expect(calc.calcExp(12)).toEqual(36000);
  });
});
describe('calculate experience to next level helper function', () => {
  it('should calculate the experience to next level based on the experience passed to calcExpTNL()', () => {
    expect(calc.calcExpTNL(800)).toEqual(200);
    expect(calc.calcExpTNL(24000)).toEqual(1000);
    expect(calc.calcExpTNL(0)).toEqual(1000);
    expect(calc.calcExpTNL(35999)).toEqual(1);
  });
});
