import React from 'react';
import { shallow } from 'enzyme';
import App from '../js/components/App';

describe('<App />', () => {
  test('should render the App', () => {
    const app = shallow(<App />);
    expect(app).toHaveLength(1);
  });
});
