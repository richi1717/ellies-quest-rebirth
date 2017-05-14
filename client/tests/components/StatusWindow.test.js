import React from 'react';
import { shallow } from 'enzyme';
import StatusWindow from '../../js/components/StatusWindow';
import charactersData from '../testHelpers/charactersData';

describe('<StatusWindow />', () => {
  let statusWindow;

  beforeEach(() => {
    statusWindow = shallow(
      <StatusWindow
        state={{
          characterStats: charactersData,
          whoIsAttacking: {
            attacker: 'hero1'
          }
        }}
      />
    );
  });

  test('should match snapshot', () => {
    expect(statusWindow.getNode()).toMatchSnapshot();
  });

  test('should have a className of battle-menu-container', () => {
    expect(statusWindow).toHaveClassName('battle-menu-container');
  });

  test('should have a className of battle-menu-main', () => {
    expect(statusWindow.find('div').at(1)).toHaveClassName('battle-menu-main');
  });

  test('should have 2 table tags', () => {
    expect(statusWindow.find('table')).toHaveLength(2);
  });

  test('should have a tbody in first table ', () => {
    expect(statusWindow.find('table').at(0).find('tbody'))
      .toHaveLength(2);
  });

  test('should say NAME in first table first th', () => {
    expect(statusWindow.find('th').at(0).text())
      .toEqual('NAME');
  });

  test('should have className of menu-select character in first table second tbody', () => {
    expect(statusWindow.find('table')
      .at(0)
      .find('tbody')
      .at(1)
      .find('td')
      .at(0)).toHaveClassName('menu-select character');
  });

  test('should say HP in second table first th', () => {
    expect(statusWindow
      .find('table')
      .at(1)
      .find('th')
      .at(0)
      .text()).toEqual('HP');
  });

  test('should say MP in second table second th', () => {
    expect(statusWindow.find('table')
      .at(1)
      .find('th')
      .at(1)
      .text()).toEqual('MP');
  });

  test('should have className of health-bar in second table second tbody', () => {
    expect(statusWindow.find('table')
      .at(1)
      .find('tbody')
      .at(1)
      .find('td')
      .at(0)).toHaveClassName('health-bar');
  });

  test('should have className of magic-bar in second table second tbody', () => {
    expect(statusWindow.find('table')
      .at(1)
      .find('tbody')
      .at(1)
      .find('td')
      .at(1)).toHaveClassName('magic-bar');
  });
});

