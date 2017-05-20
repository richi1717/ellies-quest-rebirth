import React from 'react';
import { shallow } from 'enzyme';
import Character from '../../js/components/Character';
import { heroAttackFX } from '../../js/helpers/soundEffects';
// import Victory from '../../js/components/Victory';

jest.useFakeTimers();
jest.mock('../../js/helpers/soundEffects');

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
          attacker: 'hero2',
          target: 'enemy1'
        },
        characterStats: [
          { killed: false }
        ]
      },
      killed: false,
      classes: 'red-boy',
      attackerId: 'hero1'
    };

    character = shallow(<Character {...props} />);
  });

  describe('render()', () => {
    test('should have a className of battle-hero and battle-ff-sprite', () => {
      expect(character.find('div').at(1)).toHaveClassName('battle-hero battle-ff-sprite');
    });

    test('should have a className of front-row if position is less than 3', () => {
      expect(character.find('div').at(1)).toHaveClassName('front-row');
    });

    test('should not have a className of front-row if position is more than 3', () => {
      props.position = 3;
      character = shallow(<Character {...props} />);
      expect(character.find('div').at(1)).not.toHaveClassName('front-row');
    });

    test('should have a className of back-row if position is more than 3', () => {
      props.position = 3;
      character = shallow(<Character {...props} />);
      expect(character.find('div').at(1)).toHaveClassName('back-row');
    });

    test('should have a className of position1 if position is 1', () => {
      expect(character.find('div').at(1)).toHaveClassName('position1');
    });
    //
    // test('should not have Victory component when any enemy is alive', () => {
    //   expect(character.find(Victory)).toHaveLength(0);
    // });
    //
    // test('should have Victory component when all enemies are dead', () => {
    //   props.state.enemyStats[0].killed = true;
    //   props.state.enemyStats[1].killed = true;
    //   character = shallow(<Character {...props} />);
    //   expect(character.find(Victory)).toHaveLength(1);
    // });

    test('should call heroAttackFX whoIsAttacking.target and whoIsAttacking.attacker equals attackerId', () => {
      props.attackerId = 'hero2';
      character = shallow(<Character {...props} />);
      expect(heroAttackFX).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(heroAttackFX).toHaveBeenCalled();
    });
  });
});

