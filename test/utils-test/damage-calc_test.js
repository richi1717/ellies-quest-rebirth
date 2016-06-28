import { expect } from 'chai';
import * as dmg from '../../src/utils/damage-calc';

describe('damage calculation helper function', () => {
  it('should calculate the damage based on power, defense, and base damage passed to damageCalculation()', () => {
    expect(dmg.damageCalculation(0, 0, 0)).to.equal(0);
  });
  it('should calculate the damage based on power, defense, and base damage passed to damageCalculation()', () => {
    expect(dmg.damageCalculation(20, 20, 500)).to.equal(6006);
  });
});
describe('base damage calculation helper function', () => {
  it('should calculate the base damage based on strength and level passed to getBaseDamage()', () => {
    expect(dmg.getBaseDamage(0, 0)).to.equal(0);
  });
  it('should calculate the base damage based on strength and level passed to getBaseDamage()', () => {
    expect(dmg.getBaseDamage(10, 10)).to.equal(205.3125);
  });
});
