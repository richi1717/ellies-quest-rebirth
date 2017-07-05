import React, { PropTypes } from 'react';
import Character from '../components/Character';

export default function CharacterSelection(props) {
  function renderCharacters(characters) {
    const charactersArray = [];
    let incr = 0;

    characters.map(character => {
      incr++;

      charactersArray.push(
        <Character position={incr} key={incr} state={props.state} {...character} />
      );
    });

    return charactersArray;
  }

  return (
    <div className="characters-container">
      {renderCharacters(props.state.characterStats)}
    </div>
  );
}

CharacterSelection.propTypes = {
  state: PropTypes.object.isRequired
};
