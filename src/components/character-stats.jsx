import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCharacters } from '../actions/index';

class CharacterInfo extends Component {
  render() {
    console.log(this.props.refName, this.refs.hero1);
    return (
      <div onClick={this.props.fetchCharacters}>
        <p>Wh</p>
        <div
          className={this.props.classes + " battle-sprite-size sprite-size battle-ff-sprite battle-hero-position1-front battle-hero-red-boy battle-hero-position1"}
          name={this.props.name}
          str={this.props.str}
          maxHp={this.props.maxHp}
          currentHp={this.props.currentHp}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const c = state.get('characterInfo');
  console.dir(c.toJSON());
  console.log(`%c${c.get('name')}`, 'color: green');
  return {
    maxHp: c.get('maxHp'),
    currentHp: c.get('currentHp'),
    maxMp: c.get('maxMp'),
    currentMp: c.get('currentMp'),
    agility: c.get('agility'),
    accuracy: c.get('accuracy'),
    str: c.get('str'),
    magic: c.get('magic'),
    exp: c.get('exp'),
    def: c.get('def'),
    evade: c.get('evade'),
    name: c.get('name'),
    classes: c.get('classes'),
    refName: c.get('refName')

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCharacters }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterInfo);
