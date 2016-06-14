import React, { Component } from 'react';
import { shallowEqual } from 'react-pure-render';

export default class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // for (let key in this.props) {
    //   console.log(key, shallowEqual(this.props[key], nextProps[key]));
    //   if (this.props[key] === nextProps[key] || key.toString() === 'enemyStats') {
    //   } else {
    //     console.log('%cthis.props: ' + key + ': ' + this.props[key], 'color: green');
    //     console.log('%c------', 'color: blue');
    //     console.log('%cnextProps: ' + key + ': ' + nextProps[key], 'color: red');
    //
    //   }
    // }
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}
