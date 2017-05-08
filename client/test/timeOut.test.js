// jest.unmock('../src/components/time-out');
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import TimeOut from '../src/components/time-out';
//
// describe('TimeOut', () => {
//
//   it('sets a timeout if pause is true', () => {
//     const timer = TestUtils.renderIntoDocument(
//       <TimeOut labelOn="On" labelOff="Off" />
//     );
//
//     const checkboxNode = ReactDOM.findDOMNode(checkbox);
//
//     // Verify that it's Off by default
//     expect(checkboxNode.textContent).toEqual('Off');
//
//     // Simulate a click and verify that it is now On
//     TestUtils.Simulate.change(
//       TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
//     );
//     expect(checkboxNode.textContent).toEqual('On');
//   });
//
// });
