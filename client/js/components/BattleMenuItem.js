import React, { Component } from 'react';
import {
  setMenuAttackSelected,
  ROOT_URL,
  setListOfItems,
  setItemSelectedBoolean,
  setItemObjectFromSelection
} from '../actions/actionCreators';

import classnames from 'classnames';

export default class BattleMenuAttack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    };
  }
  //
  // componentWillMount() {
  //   const url = `${ROOT_URL}/items.json`;
  //   this.serverRequest = axios.get(url)
  //     .then(response => {
  //       console.log(response.data);
  //       this.getItems = this.setItems(response.data);
  //       this.setState({done: true});
  //     });
  // }

  setItems(items) {
    const ARR = [];
    for (const KEY in items) {
      if (items[KEY].inStock > 0) {
        this.props.setListOfItems(fromJS(items[KEY]), KEY);
        ARR.push(items[KEY]);
      }
    }
    return ARR;
  }

  getRenderedListOfItemsFirstFive() {
    const ARR = [];
    for (const KEY in this.props.getListOfItems) {
      const CLICK = "handleItem" + KEY + "Click";
      const ITEM = this.props.getListOfItems[KEY];
      const PROPS = this.props;
      /* eslint-disable */
      if (KEY < 5) {
        function CLICK() {
          PROPS.setItemSelectedBoolean(true);
          PROPS.setItemObjectFromSelection(ITEM);
          // console.log(ITEM);
        }
        ARR.push(
          <li key={KEY}>
            <button className="menu-select" onClick={CLICK}>
              {ITEM.name + "  x" + ITEM.inStock}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  }

  getRenderedListOfItemsAfterFive() {
    const ARR = [];
    for (const KEY in this.props.getListOfItems) {
      const CLICK = "handleItem" + KEY + "Click";
      const ITEM = this.props.getListOfItems[KEY];
      const PROPS = this.props;
      /* eslint-disable */
      if (KEY > 4) {
        function CLICK() {
          PROPS.setItemSelectedBoolean(true);
          PROPS.setItemObjectFromSelection(ITEM);
          // console.log(ITEM);
        }
        ARR.push(
          <li key={KEY}>
            <button className="menu-select" onClick={CLICK}>
              {ITEM.name + "  x" + ITEM.inStock}
            </button>
          </li>
        );
      }
      /* eslint-enable */
    }
    return ARR;
  }

  render() {
    const INLINE_STYLE = {
      display: 'none'
    };
    if (this.props.isMenuItemsSelected && this.state.done) {
      const CLASSES = {
        'battle-menu-turn': true,
        'menu-items': true,
        'sub-menu': true,
        'more-than-five': this.props.getListOfItems.length > 4 ? true : false
      };
      if (this.props.getListOfItems.length < 5) {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfItemsFirstFive()}
            </div>
          </div>
        );
      } else {
        return (
          <div className={classnames(CLASSES)}>
            <div>
              {this.getRenderedListOfItemsFirstFive()}
            </div>
            <div>
              {this.getRenderedListOfItemsAfterFive()}
            </div>
          </div>
        );
      }
    } else {
      return <span style={INLINE_STYLE} />;
    }
  }
}
