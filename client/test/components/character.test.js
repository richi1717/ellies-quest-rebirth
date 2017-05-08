import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Character from '../../src/components/character';
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
    classes: 'red-boy',
    handleClick: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Character {...props} />);
  const output = renderer.getRenderOutput();
  const component = TestUtils.renderIntoDocument(<Character classes="red-boy" enemyStats={props.enemyStats} turnSpeed="10" position="0" key="0" {...{str: 5, def: 10}} />);
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
  describe('Character', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');

      const [ div, div2 ] = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.id).toBe('hero0');

      expect(div2.type).toBe('div');
      expect(div2.ref).toBe('hero0');
      expect(div2.props.className).toBe('battle-hero battle-ff-sprite position1 front-row dead red-boy');
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
