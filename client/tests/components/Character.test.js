import React from 'react';
import { shallow } from 'enzyme';
import dispatch from '../../js/dispatch';
import Character from '../../js/components/Character';
import types from '../../js/constants/actionTypes';
import { HeroAttackFX } from '../../js/components/SoundEffects';
import Victory from '../../js/components/Victory';

jest.mock('../../js/dispatch');

describe('<Character />', () => {
  let character;
  let props;

  beforeEach(() => {
    props = {
      position: 1,
      state: {
        enemyStats: [
          { killed: false },
          { killed: false }
        ],
        whoIsAttacking: {
          attacker: 'hero2'
        }
      },
      killed: false,
      classes: 'red-boy',
      attackerId: 'hero1'
    };

    character = shallow(<Character {...props} />);
  });

  describe('heroClick()', () => {
    test('should not trigger dispatch if whoIsAttacking.attacker matches id', () => {
      character.find('button').simulate('click', { target: { id: 'hero2' } });
      expect(dispatch).not.toHaveBeenCalled();
    });

    test('should trigger dispatch with info', () => {
      character.find('button').simulate('click', { target: { id: 'hero1' } });
      expect(dispatch).toHaveBeenCalledWith({
        type: types.SET_ATTACKER_AND_TARGET,
        attacker: 'hero1',
        target: '',
        typeOfAttack: ''
      });
    });
  });

  describe('render()', () => {
    test('should have a className of battle-hero and battle-ff-sprite', () => {
      expect(character.find('button')).toHaveClassName('battle-hero battle-ff-sprite');
    });

    test('should have a className of front-row if position is less than 3', () => {
      expect(character.find('button')).toHaveClassName('front-row');
    });

    test('should not have a className of front-row if position is more than 3', () => {
      props.position = 3;
      character = shallow(<Character {...props} />);
      expect(character.find('button')).not.toHaveClassName('front-row');
    });

    test('should have a className of back-row if position is more than 3', () => {
      props.position = 3;
      character = shallow(<Character {...props} />);
      expect(character.find('button')).toHaveClassName('back-row');
    });

    test('should have a className of position1 if position is 1', () => {
      expect(character.find('button')).toHaveClassName('position1');
    });

    test('should not have Victory component when any enemy is alive', () => {
      expect(character.find(Victory)).toHaveLength(0);
    });

    test('should have Victory component when all enemies are dead', () => {
      props.state.enemyStats[0].killed = true;
      props.state.enemyStats[1].killed = true;
      character = shallow(<Character {...props} />);
      expect(character.find(Victory)).toHaveLength(1);
    });

    test('should have HeroAttackFX component when state.pos2 is true', () => {
      character.setState({ pos2: true });
      expect(character.find(HeroAttackFX)).toHaveLength(1);
    });
  });
});

