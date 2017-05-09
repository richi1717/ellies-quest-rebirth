import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPauseBetweenTurns } from '../actions/actionCreators';
import { setTimeOutHelper } from '../helpers/time-out';

class TimeOutHandler extends Component {

  componentDidUpdate() {
    if (this.props.isPauseBetweenTurns) {
      setTimeOutHelper(2000, this.props.setPauseBetweenTurns, false);
    }
  }

  render() {
    return null;
  }
}

TimeOutHandler.propTypes = {
  isPauseBetweenTurns: PropTypes.bool,
  setPauseBetweenTurns: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isPauseBetweenTurns: state.get('isPauseBetweenTurns').toJS()[0]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPauseBetweenTurns}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeOutHandler);
