import _random from 'lodash.random';
import damageCalc, { getBaseDamage } from '../../js/helpers/damageCalc';

jest.mock('lodash.random');

describe('damageCalc', () => {
  let attacker;
  let defender;

  beforeEach(() => {
    attacker = {
      str: 100,
      exp: 250
    };
    defender = {
      def: 10
    };
  });

  describe('getBaseDamage', () => {
    test('should calculate the base damage based on attacker.str and attacker.exp', () => {
      expect(getBaseDamage(attacker)).toEqual(1086.328125);
    });

    test('should use the attacker.level if passed in', () => {
      attacker.level = 1;
      expect(getBaseDamage(attacker)).toEqual(1086.328125);
    });
  });

  describe('damageCalc', () => {
    test('should increase the damage if it is a crit hit', () => {
      _random.mockReturnValueOnce(26)
        .mockReturnValueOnce(2);
      expect(damageCalc(attacker, defender)).toEqual(1332);
    });

    test('should calculate the damage based on attacker str and exp vs defender.des', () => {
      _random.mockReturnValueOnce(1)
        .mockReturnValueOnce(1);
      expect(damageCalc(attacker, defender)).toEqual(666);
    });

    test('if damage will be zero return 1 instead', () => {
      _random.mockReturnValueOnce(1)
        .mockReturnValueOnce(1);
      attacker.str = 0;
      expect(damageCalc(attacker, defender)).toEqual(1);
    });
  });
});
