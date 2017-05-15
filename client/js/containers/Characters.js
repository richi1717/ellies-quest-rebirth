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
      done: false
    };
  }

  componentWillMount() {
    const url = `${DATA_BASE_URL_CHARACTERS}`;
    this.serverRequest = fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setCharacters(data);
        this.setState({ done: true });
      });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  setCharacters(x) {
    const characters = [];
    const playableCharacters = filter(x, { inPlay: true });

    playableCharacters.map((character, id) => {
      dispatch({
        type: types.UPDATE_CHARACTER_STATS,
        character,
        id
      });
    });
  }

  renderCharacters(x) {
    const characters = [];
    let incr = 0;

    x.map(character => {
      incr++;

      characters.push(
        <Character position={incr} key={incr} state={this.props.state} {...character} />
      );
    });

    return characters;
  }

  render() {
    return (
      <div className="characters-container">
        {this.state.done ? this.renderCharacters(this.props.state.characterStats) : null}
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  state: PropTypes.object.isRequired
};
