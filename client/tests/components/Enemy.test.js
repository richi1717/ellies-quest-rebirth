import React from 'react';
import { shallow } from 'enzyme';
import Enemy from '../../js/components/Enemy';
import { EnemyAttackFX } from '../../js/components/SoundEffects';
import dispatch from '../../js/dispatch';

jest.mock('../../js/dispatch');

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
          { killed: false }
        ],
        whoIsAttacking: {
          attacker: ''
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

  test('should have EnemyAttackFX if attacker is the same as the enemyId', () => {
    props.state.whoIsAttacking.attacker = 'enemy1';
    enemy = shallow(<Enemy {...props} />);
    expect(enemy.find(EnemyAttackFX)).toHaveLength(1);
  });

  test('should call dispatch when enemy is clicked', () => {
    enemy.find('button').simulate('click', { target: { id: 'enemy1' } });
    expect(dispatch).toHaveBeenCalled();
  });
});
