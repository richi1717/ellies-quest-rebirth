import React from 'react';
import { shallow } from 'enzyme';
import BattleMenuListOfTargets from '../../js/components/BattleMenuListOfTargets';
import attack from '../../js/battleOrder/normalAttack';

jest.mock('../../js/battleOrder/normalAttack');

describe('<BattleMenuListOfTargets />', () => {
  const heroClick = jest.fn();
  const enemyClick = jest.fn();
  let listOfTargets;
  let state;

  beforeAll(() => {
    const obj = { click: heroClick };
    const obj2 = { click: enemyClick };
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(e => (e === 'h1' ? obj : obj2))
    });
  });

  beforeEach(() => {
    state = {
      enemyStats: [
        {
          killed: false,
          name: 'eTest1',
          attackerId: 'e1'
        },
        {
          killed: true,
          name: 'eTest2',
          attackerId: 'e2'
        }
      ],
      characterStats: [
        {
          killed: false,
          name: 'hTest1',
          attackerId: 'h1'
        },
        {
          killed: true,
          name: 'hTest2',
          attackerId: 'h2'
        }
      ],
      battleMenuAction: { selection: 'items' }
    };
    listOfTargets = shallow(<BattleMenuListOfTargets state={state} />);
  });

  test('should be null', () => {
    state.battleMenuAction.selection = 'run';
    listOfTargets = shallow(<BattleMenuListOfTargets state={state} />);
    expect(listOfTargets.type()).toEqual(null);
  });

  test('should render a list of names', () => {
    // 3 because it should ignore dead enemies
    expect(listOfTargets.find('button')).toHaveLength(3);
  });

  test('should render a list of names', () => {
    state.battleMenuAction.selection = 'magic';
    listOfTargets = shallow(<BattleMenuListOfTargets state={state} />);
    expect(listOfTargets.find('button')).toHaveLength(3);
  });

  test('should render a list of names', () => {
    state.battleMenuAction.selection = 'attack';
    listOfTargets = shallow(<BattleMenuListOfTargets state={state} />);
    expect(listOfTargets.find('button')).toHaveLength(2);
  });

  test('should render a list of names with 2 sub container divs if more than 5', () => {
    state.enemyStats = [{ killed: false, name: 'e1' }, { killed: false, name: 'e2' },
      { killed: false, name: 'e3' }, { killed: false, name: 'e4' }];
    listOfTargets = shallow(<BattleMenuListOfTargets state={state} />);
    expect(listOfTargets.find('div')).toHaveLength(3);
  });

  test('should trigger click on hero element that has id that matches attackerId', () => {
    listOfTargets.find('button').at(0).simulate('click');
    expect(attack).toHaveBeenCalledWith('h1');
  });

  test('should trigger click on enemy element that has id that matches attackerId', () => {
    listOfTargets.find('button').at(2).simulate('click');
    expect(attack).toHaveBeenLastCalledWith('e1');
  });

  test('should have hero names rendered first', () => {
    expect(listOfTargets.find('button').at(0).text()).toEqual('hTest1');
  });
});
