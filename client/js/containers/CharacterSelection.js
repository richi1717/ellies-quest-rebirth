import React, { Component, PropTypes } from 'react';
import filter from 'lodash.filter';
import { updateCharacterStats, ROOT_URL, FIREBASE_API } from '../actions/actionCreators';
import Character from '../components/Character';
import dispatch from '../dispatch';

export default class CharacterSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      done: false
    };
  }

  componentWillMount() {
    const url = `${ROOT_URL}/characters${FIREBASE_API}`;
    this.serverRequest = fetch(url)
      .then(response => response.json())
      .then(data => {
        this.character = data;
        this.getCharacters = this.setCharacters(this.character);
        this.setState({ done: true });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  setCharacters(x) {
    const CHARACTER = [];
    const PLAYABLE_CHARACTERS = filter(x, { inPlay: true });
    for (let key = 0; key < PLAYABLE_CHARACTERS.length; key++) {
      dispatch(updateCharacterStats(PLAYABLE_CHARACTERS[key], key));
      CHARACTER.push(
        <Character classes={PLAYABLE_CHARACTERS[key].classes} turnSpeed={PLAYABLE_CHARACTERS[key].agility} position={key} key={key} {...PLAYABLE_CHARACTERS[key]} />
      );
    }
    return CHARACTER;
  }

  render() {
    return (
      <div className="characters-container">
        {this.state.done ? this.getCharacters : null}
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  battleScene: PropTypes.string,
  updateCharacterStats: PropTypes.func
};
