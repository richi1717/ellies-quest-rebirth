import React from 'react';
import { shallow } from 'enzyme';
import BattleScene from '../../js/components/BattleScene';
import { NormalBattleMusic } from '../../js/components/SoundEffects';

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

  test('should have a className of grass-battle battle', () => {
    expect(battleScene).toHaveClassName('grass-battle battle');
  });

  test('should render NormalBattleMusic when playMusic is true', () => {
    expect(battleScene.find(NormalBattleMusic)).toHaveLength(1);
  });

  test('should have a child with className of test', () => {
    expect(battleScene.find('div').at(1)).toHaveClassName('test');
  });
});

