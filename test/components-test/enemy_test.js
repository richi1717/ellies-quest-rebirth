import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Enemy from '../../src/components/enemy';
import { fromJS } from 'immutable';
expect.extend(expectJSX);

function setup() {
  const props = {
    getEnemySelectedTarget: expect.createSpy(),
    enemyStr: expect.createSpy(),
    hero0Stats: expect.createSpy(),
    hero1Stats: expect.createSpy(),
    hero2Stats: expect.createSpy(),
    isHero0Defending: expect.createSpy(),
    isHero1Defending: expect.createSpy(),
    isHero2Defending: expect.createSpy(),
    isPauseBetweenTurns: expect.createSpy(),
    isHero0Turn: expect.createSpy(),
    isHero1Turn: expect.createSpy(),
    isHero2Turn: expect.createSpy(),
    enemyStats: fromJS([{str: 1, def: 2, killed: false}]),
    isHero0Attacking: expect.createSpy(),
    isHero1Attacking: expect.createSpy(),
    isHero2Attacking: expect.createSpy(),
    isHeroAttackingAnimation: expect.createSpy(),
    isEnemyAttacking: expect.createSpy(),
    isEnemyTarget0: expect.createSpy(),
    isEnemyTarget1: expect.createSpy(),
    isEnemyTarget2: expect.createSpy(),
    isEnemyTarget3: expect.createSpy(),
    isEnemyTarget4: expect.createSpy(),
    getListOfTurnOrder: expect.createSpy(),
    getNextTurn: expect.createSpy(),
    isHero0Dead: expect.createSpy(),
    isHero1Dead: expect.createSpy(),
    isHero2Dead: expect.createSpy(),
    getItemObject: expect.createSpy(),
    isItemSelected: expect.createSpy(),
    position: 0,
    classes: 'red-boy'
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Enemy {...props} />);
  const output = renderer.getRenderOutput();
  const component = TestUtils.renderIntoDocument(<Enemy />);
  const node = ReactDOM.findDOMNode(component);
  const clickSpy = expect.spyOn(component, 'handleClick');

  return {
    props,
    output,
    renderer,
    clickSpy,
    component,
    node
  };
}

describe('components', () => {
  describe('Enemy', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');

      const [ div ] = output.props.children;

      expect(div.type).toBe('div');
      expect(div.ref).toBe('enemy0');
      expect(div.props.className).toBe('enemy-sprites undefined enemy0');
      expect(div.props.id).toBe('enemy0');

    });

    it('should call handleClick when clicked', () => {
      const { clickSpy, component, node } = setup();
      expect(component.handleClick).toBeA('function');
      expect(clickSpy.calls.length).toBe(0);
      TestUtils.Simulate.click(node);
      expect(clickSpy).toHaveBeenCalled();
      expect(clickSpy.calls.length).toBe(1);
    });
  });
});
