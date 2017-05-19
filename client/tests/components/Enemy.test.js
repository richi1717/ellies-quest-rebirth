import React from 'react';
import { shallow } from 'enzyme';
import Enemy from '../../js/components/Enemy';
import { enemyAttackFX } from '../../js/components/SoundEffects';
import dispatch from '../../js/dispatch';
import damageCalculation from '../../js/helpers/damageCalc';

jest.mock('../../js/dispatch');
jest.mock('../../js/helpers/damageCalc');

describe('<Enemy />', () => {
  let enemy;
  let props;

  beforeAll(() => {
    const element = { style: { opacity: 1, display: 'block' } };
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => element)
    });
    Object.defineProperty(window, 'requestAnimationFrame', {
      value: jest.fn(fn => fn())
    });
  });

  beforeEach(() => {
    props = {
      state: {
        enemyStats: [
          {
            killed: false,
            def: 10,
            currentHp: 1
          }
        ],
        characterStats: [
          {
            str: 10,
            exp: 10
          }
        ],
        whoIsAttacking: {
          attacker: 'hero1'
        }
      },
      position: 1,
      classes: 'test it'
    };
    enemy = shallow(<Enemy {...props} />);
  });

  test('should render if enemy is not dead', () => {
    expect(enemy.find('button')).toHaveClassName('enemy-sprites test it enemy1');
  });

  test('should not render anything if enemy is dead', () => {
    props.state.enemyStats[0].killed = true;
    enemy = shallow(<Enemy {...props} />);
    expect(enemy.type()).toEqual(null);
  });

  test('should have enemyAttackFX if attacker is the same as the enemyId', () => {
    props.state.whoIsAttacking.attacker = 'enemy1';
    enemy = shallow(<Enemy {...props} />);
    expect(enemy.find(enemyAttackFX)).toHaveLength(1);
  });
  //
  // test('should have enemyAttackFX if attacker is the same as the enemyId', () => {
  //   props.state.whoIsAttacking.attacker = 'enemy1';
  //   enemy = shallow(<Enemy {...props} />);
  //   enemy.find('button').simulate('click', { target: { id: 'enemy1' } });
  //   expect(enemy).toHaveLength(1);
  // });

  test('should call dispatch when enemy is clicked', () => {
    damageCalculation.mockImplementation(() => 1);
    enemy.find('button').simulate('click', { target: { id: 'enemy1' } });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).lastCalledWith({
      type: 'SET_ATTACKER_AND_TARGET',
      attacker: '',
      target: '',
      typeOfAttack: ''
    });
  });

  test('should call dispatch when enemy is clicked', () => {
    damageCalculation.mockImplementation(() => 1);
    props.state.enemyStats[0].currentHp = 100;
    enemy.find('button').simulate('click', { target: { id: 'enemy1' } });
    expect(dispatch).lastCalledWith({
      type: 'SET_ATTACKER_AND_TARGET',
      attacker: '',
      target: '',
      typeOfAttack: ''
    });
  });
});
