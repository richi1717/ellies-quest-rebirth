import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBattleScene, updateCharacterStats, ROOT_URL, FIREBASE_API } from '../actions/index';
import Character from './character-container';
import classnames from 'classnames';
import axios from 'axios';
import _ from 'lodash';

class CharacterSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false
    };
  }

  componentWillMount() {
    const url = `${ROOT_URL}/characters${FIREBASE_API}`;
    this.serverRequest = axios.get(url)
      .then(response => {
        this.character = response.data;
        this.getCharacters = this.setCharacters(this.character);
        this.props.setBattleScene('forest');
        this.setState({done: true});
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  setCharacters(x) {
    const CHARACTER = [];
    const PLAYABLE_CHARACTERS = _.filter(x, { inPlay: true });
    for (let key = 0; key < PLAYABLE_CHARACTERS.length; key++) {
      this.props.updateCharacterStats(PLAYABLE_CHARACTERS[key], key);
      CHARACTER.push(
        <Character classes={PLAYABLE_CHARACTERS[key].classes} turnSpeed={PLAYABLE_CHARACTERS[key].agility} position={key} key={key} {...PLAYABLE_CHARACTERS[key]} />
      );
    }
    return CHARACTER;
  }

  render() {
    return (
      <div>
        {this.state.done ? this.getCharacters : null}
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  setBattleScene: PropTypes.func.isRequired,
  updateCharacterStats: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setBattleScene, updateCharacterStats }, dispatch);
}

export default connect(null, mapDispatchToProps)(CharacterSelection);
