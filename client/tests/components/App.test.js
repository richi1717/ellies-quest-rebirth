import React from 'react';
import { shallow } from 'enzyme';
import App from '../../js/components/App';
import BattleScene from '../../js/components/BattleScene';

describe('<App />', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App {...{ state: {}, battleScene: 'forest' }} />);
  });

  test('should render the App', () => {
    expect(app).toHaveLength(1);
  });

  test('should Have a BattleScene', () => {
    expect(app.find(BattleScene)).toHaveLength(1);
  });
});
