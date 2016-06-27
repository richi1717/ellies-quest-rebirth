// jest.unmock('../src/components/app');
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import App from '../src/components/app';
//
// describe('App', () => {
//
//   it('renders the components', () => {
//     // Render a checkbox with label in the document
//     const checkbox = TestUtils.renderIntoDocument(
//       <CheckboxWithLabel labelOn="On" labelOff="Off" />
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
