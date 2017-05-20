import React from 'react';
import { shallow } from 'enzyme';
import Enemy from '../../js/components/Enemy';
import { enemyAttackFX } from '../../js/helpers/soundEffects';

jest.mock('../../js/helpers/soundEffects');

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
    expect(enemy.find('div').at(1)).toHaveClassName('enemy-sprites test it enemy1');
  });

  test('should not render anything if enemy is dead', () => {
    props.state.enemyStats[0].killed = true;
    enemy = shallow(<Enemy {...props} />);
    expect(enemy.type()).toEqual(null);
  });

  test('should call enemyAttackFX if attacker is the same as the enemyId', () => {
    props.state.whoIsAttacking.attacker = 'enemy1';
    enemy = shallow(<Enemy {...props} />);
    expect(enemyAttackFX).toHaveBeenCalled();
  });
});
