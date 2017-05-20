import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { heroAttackFX } from '../helpers/soundEffects';
// import Victory from './Victory';
// import setTimeoutHelper from '../helpers/time-out';
// import { damageCalculation, getBaseDamage } from '../helpers/damage-calc';

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pos2: false
    };
  }

  shouldComponentUpdate() {
    const { state, position } = this.props;
    const isHeroDeadAndNotBeingRevived = state.characterStats[position - 1].killed;
      // && this.props.getItemObject.type !== 'Revive';
    return !isHeroDeadAndNotBeingRevived;
  }

  //
  setHeroAttackingAnimation() {
    setTimeout(() => {
      heroAttackFX();
    }, 800);
    // setTimeout(() => {
    //   // dispatch({
    //   //   type: types.SET_ATTACKER_AND_TARGET,
    //   //   attacker: '',
    //   //   target: '',
    //   //   typeOfAttack: ''
    //   // });
    //   this.setState({ pos2: false });
    // }, 1300);
  }
  //
  // setNextTurnAfterHeroIsDone() {
  //   setTimeOutHelper(1000, this.props.setPauseBetweenTurns, true);
  //   setTimeOutHelper(1300, this.props.setListOfTurnOrder, this.props.getNextTurn);
  //   setTimeOutHelper(1300, this.props.setNextTurnFromList, this.props.getListOfTurnOrder);
  //   setTimeOutHelper(1300, this.props.setHeroAttacking, false, this.props.position);
  // }
  //
  // handleHeroTurn() {
  //   this.setHeroAttackingAnimation();
  //   this.setNextTurnAfterHeroIsDone();
  // }
  //
  // handleEnemyAttacking(heroStats, position) {
  //   const DMG = this.getDamageAmount(heroStats.toJS());
  //   const DMG_DISPLAY = document.getElementById('dmg-display-hero' + position);
  //   this.damageDisplayFadeIn(DMG_DISPLAY, 'damage');
  //   if (DMG > 0) {
  //     console.log(heroStats.toJS());
  //     let newHp = heroStats.toJS().currentHp - DMG;
  //     newHp = newHp <= 0 ? 0 : newHp;
  //     const NEW_STATS = newHp === 0 ? heroStats.set('killed', true).set('currentHp', 0) : heroStats.set('currentHp', newHp);
  //     if (newHp === 0) {
  //       let indexOfDead;
  //       for (const KEY in this.props.getListOfTurnOrder.toJS()) {
  //         this.props.getListOfTurnOrder.toJS()[KEY] === 'hero' + position ? indexOfDead = KEY : null;
  //       }
  //       this.props.removeHeroFromList(indexOfDead);
  //     }
  //     console.log(NEW_STATS.toJS(), position);
  //     this.props.updateCharacterStats(NEW_STATS.toJS(), position);
  //     console.log('%cdamage: ' + DMG, 'color: red');
  //   }
  // }
  //
  // handleItemUseOnHero(restoration, heroStats, position, type) {
  //   if (type === 'hp') {
  //     restoration = restoration + heroStats.toJS().currentHp >= heroStats.toJS().maxHp ?
  //       heroStats.toJS().maxHp - heroStats.toJS().currentHp : restoration;
  //       if (restoration > 0) {
  //         console.log(heroStats.toJS());
  //         const newHp = heroStats.toJS().currentHp + restoration;
  //         const NEW_STATS = newHp !== 0 ? heroStats.set('currentHp', newHp) : heroStats;
  //         console.log(NEW_STATS.toJS(), position);
  //         this.props.updateCharacterStats(NEW_STATS.toJS(), position);
  //         console.log('%ccure: ' + restoration, 'color: green');
  //       }
  //   } else if (type === 'mp') {
  //     restoration = restoration + heroStats.toJS().currentMp >= heroStats.toJS().maxMp ?
  //       heroStats.toJS().maxMp - heroStats.toJS().currentMp : restoration;
  //       if (restoration > 0) {
  //         console.log(heroStats.toJS());
  //         const newMp = heroStats.toJS().currentMp + restoration;
  //         const NEW_STATS = newMp !== 0 ? heroStats.set('currentMp', newMp) : heroStats;
  //         console.log(NEW_STATS.toJS(), position);
  //         this.props.updateCharacterStats(NEW_STATS.toJS(), position);
  //         console.log('%cMP cure: ' + restoration, 'color: green');
  //       }
  //   }
  //   // console.log('%cMP cure: ' + restoration, 'color: red');
  //   this.damage = restoration;
  //   const DMG_DISPLAY = document.getElementById('dmg-display-hero' + position);
  //   this.damageDisplayFadeIn(DMG_DISPLAY, 'restore');
  // }
  //
  // getDamageAmount(heroStats) {
  //   const POWER = 1/16;
  //   const STR = this.props.isMenuDefendSelected ? this.props.enemyStr * 0.618 : this.props.enemyStr;
  //   let damage = damageCalculation(POWER, heroStats.def, STR);
  //   damage = damage >= heroStats.currentHp ? heroStats.currentHp : damage;
  //   this.damage = damage;
  //   return damage;
  // }
  //
  // setInitialTurn() {
  //   if (this.props.getListOfTurnOrder.toJS()[0] === ('hero' + this.props.position)) {
  //     console.log('once');
  //     this.props.setNextTurnFromList(this.props.getListOfTurnOrder);
  //     this.props.setHeroAttacking(true, this.props.position);
  //   }
  // }
  //
  // damageDisplayFadeIn(element, type, display) {
  //   element.style.opacity = 0;
  //   element.style.display = display || "block";
  //   type === 'restore' ? element.style.color = "00FF3C" : element;
  //   // element.style.top = '30%';
  //   let pos = 0;
  //
  //   (function fade() {
  //     let val = parseFloat(element.style.opacity);
  //     if (!((val += 0.01) > 1)) {
  //       element.style.opacity = val;
  //       pos--;
  //       element.style.top = pos + 'px';
  //       requestAnimationFrame(fade);
  //     } else {
  //       element.style.display = 'none';
  //     }
  //   })();
  // }

  showDamageOverHead() {
    // const STYLE = { display: 'none' };
    return (
      <div
        id={`dmg-display-hero${this.props.position}`}
        className="damage-display-hero"
      >
        {this.damage}
      </div>
    );
  }

  render() {
    const { position, killed, classes, state, attackerId } = this.props;
    const { whoIsAttacking } = state;
    const isHeroAttacking = whoIsAttacking.target && whoIsAttacking.attacker === attackerId;
    isHeroAttacking && this.setHeroAttackingAnimation();

    const heroClass = {
      [`battle-hero battle-ff-sprite position${position} ${classes}`]: true,
      'front-row': position < 3,
      'back-row': position >= 3,
      'dead': killed,
      'attacking hero-turn': whoIsAttacking.attacker === attackerId,
      [`attack-${whoIsAttacking.target}`]: isHeroAttacking,
      'attack-swing': isHeroAttacking
    };

    return (
      <div>
        <div className={`${classnames(heroClass)}`}>
          {this.showDamageOverHead()}
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  position: PropTypes.number,
  classes: PropTypes.string,
  killed: PropTypes.bool,
  state: PropTypes.object,
  attackerId: PropTypes.string
};
