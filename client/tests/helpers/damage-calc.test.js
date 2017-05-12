import * as dmg from '../../js/helpers/damage-calc';

describe('damage calculation helper function', () => {
  it('should calculate the damage based on power, defense, and base damage passed to damageCalculation()', () => {
    expect(dmg.damageCalculation(0, 0, 0)).toEqual(0);
  });
  it('should calculate the damage based on power, defense, and base damage passed to damageCalculation()', () => {
    // expect(dmg.damageCalculation(20, 20, 500)).toEqual(6006);
    expect(dmg.damageCalculation(20, 20, 500)).toEqual(9668);
  });
});
describe('base damage calculation helper function', () => {
  it('should calculate the base damage based on strength and level passed to getBaseDamage()', () => {
    expect(dmg.getBaseDamage(0, 0)).toEqual(0);
  });
  it('should calculate the base damage based on strength and level passed to getBaseDamage()', () => {
    expect(dmg.getBaseDamage(10, 10)).toEqual(205.3125);
  });
});
