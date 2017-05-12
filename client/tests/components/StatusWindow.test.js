import React from 'react';
import { shallow } from 'enzyme';
import StatusWindow from '../../js/components/StatusWindow';
import charactersData from '../testHelpers/charactersData';

describe('<StatusWindow />', () => {
  let statusWindow;
  let characters;

  beforeEach(() => {
    characters = charactersData;
    statusWindow = shallow(<StatusWindow characterStats={characters} />);
  });

  test('should have a className of battle-menu-container', () => {
    expect(statusWindow).toHaveClassName('battle-menu-container');
  });
});

