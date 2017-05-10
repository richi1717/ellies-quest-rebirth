import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import setTimeoutHelper from '../helpers/time-out';
import { HeroAttackFX, BattleVictoryMusic } from './SoundEffects';
// import { damageCalculation, getBaseDamage } from '../helpers/damage-calc';

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: false,
      done: false,
      pos2: false
    };
    // TODO figure out why tests hate es7
  }

  // shouldComponentUpdate() {
  //   const HERO = 'isHero' + this.props.position + 'Dead';
  //   const IS_HERO_DEAD_AND_NOT_REVIVE = this.props[HERO] && this.props.getItemObject.type !== 'Revive';
  //   return !IS_HERO_DEAD_AND_NOT_REVIVE;
  // }
  //
  // handleVictoryState() {
  //   const STYLE = { color: 'black'};
  //   return <div style={STYLE}>You Win!!!!!!!</div>;
  // }
  //
  // setHeroAttackingAnimation() {
  //   setTimeout(function () {
  //     this.setState({ pos2: true });
  //   }.bind(this), 550);
  //   setTimeout(function () {
  //     this.setState({ pos2: false });
  //   }.bind(this), 1300);
  // }
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

  areAllEnemiesDead() {
    // let dead = false;
    // for (let i = 0; i < this.props.enemyStats.length; i ++) {
    //   if (this.props.enemyStats[i].get('killed')) {
    //     dead = true;
    //   } else {
    //     // dead = false;
    //     return false;
    //   }
    // }
    // return dead;
    return false;
  }
  //
  position0Classes() {
    return {
      'position1': true,
      'front-row': true,
      'attack-swing': this.state.pos2
      // 'defense': !this.props.isHero0Dead && this.props.isHero0Defending,
      // 'attacking': this.props.isHero0Attacking && !this.props.isPauseBetweenTurns,
      // 'hero-turn': this.props.isHero0Attacking && !this.props.isPauseBetweenTurns,
      // 'dead': this.props.isHero0Dead
    };
  }

  position1Classes() {
    return {
      'position2': true,
      'front-row': true,
      'attack-swing': this.state.pos2
      // 'defense': !this.props.isHero1Dead && this.props.isHero1Defending,
      // 'attacking': this.props.isHero1Attacking && !this.props.isPauseBetweenTurns,
      // 'hero-turn': this.props.isHero1Attacking && !this.props.isPauseBetweenTurns,
      // 'dead': this.props.isHero1Dead
    };
  }

  position2Classes() {
    return {
      'position3': true,
      'back-row': true,
      'attack-swing': this.state.pos2
      // 'defense': !this.props.isHero2Dead && this.props.isHero2Defending,
      // 'attacking': this.props.isHero2Attacking && !this.props.isPauseBetweenTurns,
      // 'hero-turn': this.props.isHero2Attacking && !this.props.isPauseBetweenTurns,
      // 'dead': this.props.isHero2Dead
    };
  }
  //
  // enemySelectionPositionClasses(nameOfClass) {
  //   nameOfClass['attack-enemy0'] = this.props.isEnemyTarget0;
  //   nameOfClass['attack-enemy1'] = this.props.isEnemyTarget1;
  //   nameOfClass['attack-enemy2'] = this.props.isEnemyTarget2;
  //   nameOfClass['attack-enemy3'] = this.props.isEnemyTarget3;
  //   nameOfClass['attack-enemy4'] = this.props.isEnemyTarget4;
  // }
  //
  // handleClick() {
  //   if (this.props.isItemSelected && this.props.getItemObject.length !== 0) {
  //     switch (this.props.getItemObject.type) {
  //       case 'HP restore': {
  //         // TODO rewrite this to not use the same action but to close turn window
  //         this.props.setHeroToEnemyTarget(true, this.props.position);
  //         this.props.setItemSelectedBoolean(false);
  //         this.props.setItemObjectFromSelection(null);
  //         this.props.setMenuItemsSelected(false);
  //         this.handleItemUseOnHero(this.props.getItemObject.str, this.props['hero' + this.props.position + 'Stats'], this.props.position, 'hp');
  //         this.setNextTurnAfterHeroIsDone();
  //         break;
  //       }
  //       case 'MP restore': {
  //
  //       }
  //       case 'HP MP restore': {
  //
  //       }
  //       case 'Revive': {
  //         if (this.props[`isHero${this.props.position}Dead`]) {
  //           console.log('risen like Jesus!!');
  //         }
  //       }
  //       // default: {
  //       //   return false;
  //       // }
  //     }
  //     console.log(this.props.getItemObject);
  //   }
  // }

  render() {
    let heroClass;
    const constantClass = {
      'battle-hero': true,
      'battle-ff-sprite': true
    };

    if (this.props.position === 0) {
      heroClass = this.position0Classes();

      // if (this.props.getNextTurn === 'hero0') {
      //   this.enemySelectionPositionClasses(heroClass);
      // }
    } else if (this.props.position === 1) {
      heroClass = this.position1Classes();

      // if (this.props.getNextTurn === 'hero1') {
      //   this.enemySelectionPositionClasses(heroClass);
      // }
    } else if (this.props.position === 2) {
      heroClass = this.position2Classes();

      // if (this.props.getNextTurn === 'hero2') {
      //   this.enemySelectionPositionClasses(heroClass);
      // }
    }
    return (
      <div>
        <div id={`hero${this.props.position}`}>{this.props.heroCurrentHp}</div>
        <div className={`${classnames(constantClass, heroClass)} ${this.props.classes}`}>
          {this.showDamageOverHead()}
          {this.areAllEnemiesDead() ? this.handleVictoryState() : null}
        </div>
        {this.state.pos2 ? <HeroAttackFX /> : null}
        {this.areAllEnemiesDead() ? <BattleVictoryMusic /> : null}
      </div>
    );
  }
}

Character.propTypes = {
  position: PropTypes.number,
  heroCurrentHp: PropTypes.string,
  classes: PropTypes.string
};
