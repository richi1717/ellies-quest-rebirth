import React, { Component, PropTypes } from 'react';
import filter from 'lodash.filter';
import { DATA_BASE_URL_CHARACTERS } from '../constants/databaseUrls';
import Character from '../components/Character';
import types from '../constants/actionTypes';
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
    const url = `${DATA_BASE_URL_CHARACTERS}`;
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
    const characters = [];
    const playableCharacters = filter(x, { inPlay: true });
    let incr = 0;

    playableCharacters.map((character, id) => {
      incr++;
      dispatch({
        type: types.UPDATE_CHARACTER_STATS,
        character,
        id
      });
      characters.push(
        <Character position={incr} key={incr} {...character} />
      );
    });

    return characters;
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
