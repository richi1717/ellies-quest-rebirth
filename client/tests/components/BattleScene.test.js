import React from 'react';
import { shallow } from 'enzyme';
import BattleScene from '../../js/components/BattleScene';
import { normalBattleMusic } from '../../js/helpers/soundEffects';

jest.mock('../../js/helpers/soundEffects');

describe('<BattleScene />', () => {
  let battleScene;

  beforeEach(() => {
    battleScene = shallow(
      <BattleScene battleScene="grass" playMusic>
        <div className="test" />
      </BattleScene>
    );
  });

  test('should match snapshot', () => {
    expect(battleScene.getNode()).toMatchSnapshot();
  });

  test('should have default propTypes', () => {
    battleScene = shallow(
      <BattleScene>
        <div className="test" />
      </BattleScene>
    );

    expect(battleScene).toHaveClassName('forest-battle');
    expect(battleScene.find(normalBattleMusic)).toHaveLength(0);
  });

  test('should have a className of grass-battle battle', () => {
    expect(battleScene).toHaveClassName('grass-battle battle');
  });

  test('should call normalBattleMusic when playMusic is true', () => {
    expect(normalBattleMusic).toHaveBeenCalled();
  });

  test('should have a child with className of test', () => {
    expect(battleScene.find('div').at(1)).toHaveClassName('test');
  });
});

