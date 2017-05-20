import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { enemyAttackFX } from '../helpers/soundEffects';
// import setTimeoutHelper from '../helpers/time-out';

export default class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      isAttackingHero0: false,
      isAttackingHero1: false,
      isAttackingHero2: false
    };

    // this.completePhase = (enemy, id) => {
    //   dispatch({
    //     type: types.END_HERO_TURN,
    //     enemy,
    //     id
    //   });
    // };
  }
  // getRandomTargetForAttack() {
  //   console.log('inside random');
  //   const TARGET = _.random(1, this.props.heroLength) - 1;
  //   return this.isHeroDead(TARGET);
  // }
  //
  // isHeroDead(target) {
  //   if (this.props.isHero0Dead && this.props.isHero1Dead && this.props.isHero2Dead) {
  //     console.log('they\'re all dead!!!');
  //   } else {
  //     let targetNum;
  //     switch (target) {
  //       case 0: {
  //         if (this.props.isHero0Dead) {
  //           targetNum = this.props.isHero1Dead ? 2 : 1;
  //         } else {
  //           targetNum = target;
  //         }
  //         return targetNum;
  //       }
  //       case 1: {
  //         if (this.props.isHero1Dead) {
  //           targetNum = this.props.isHero2Dead ? 0 : 2;
  //         } else {
  //           targetNum = target;
  //         }
  //         return targetNum;
  //       }
  //       case 2: {
  //         if (this.props.isHero2Dead) {
  //           targetNum = this.props.isHero0Dead ? 1 : 0;
  //         } else {
  //           targetNum = target;
  //         }
  //         return targetNum;
  //       }
  //       default: {
  //         return 0;
  //       }
  //     }
  //     return targetNum;
  //   }
  // }
  //
  // handleHeroAttacking(enemyTarget) {
  //   console.log(this.props.position);
  //   const ENEMY_STATS = this.props['enemyStats' + this.props.position];
  //   const DMG = this.getDamageAmount(ENEMY_STATS);
  //   const NEW_HP = ENEMY_STATS.currentHp - DMG;
  //   this.dmg = DMG;
  //   if (NEW_HP <= 0) {
  //     const ENEMY = document.getElementById('enemy' + this.props.position);
  //     let indexOfDead;
  //     for (const KEY in this.props.getListOfTurnOrder.toJS()) {
  //       this.props.getListOfTurnOrder.toJS()[KEY] === 'enemy' + this.props.position ? indexOfDead = KEY : null;
  //     }
  //     this.props.removeEnemyFromList(indexOfDead);
  //     this.enemyKilledFadeOut(ENEMY, 'block');
  //     setTimeOutHelper(2000, this.props.deleteEnemyWhenKilled, this.props.position);
  //   } else {
  //     const NEW_STATS = this.props.enemyStats.find(function (stat) {
  //       return stat.get('id') === this.props.position;
  //     }.bind(this)).set('currentHp', NEW_HP);
  //     this.props.updateEnemyStats(NEW_STATS.toJSON(), this.props.position);
  //   }
  //   console.log('%cdamage: ' + DMG, 'color: orange');
  //   console.log('%cEnemy Health: ' + NEW_HP, 'color: green');
  // }
  //
  // getDamageAmount(enemy) {
  //   const POWER = 4;
  //   const BASE = getBaseDamage(this.props.heroStr, calcLevel(this.props.heroStats[0].exp));
  //   let damage = damageCalculation(POWER, enemy.def, this.props.heroStr);
  //   damage = damage > 0 ? damage : 1;
  //   return damage;
  // }
  //
  // damageDisplayFadeIn(element, display) {
  //   // console.log(element);
  //   element.style.opacity = 0;
  //   element.style.display = display || "block";
  //   let pos = 0;
  //
  //   (function fade() {
  //     var val = parseFloat(element.style.opacity);
  //     if (!((val += 0.01) > 1)) {
  //       element.style.opacity = val;
  //       pos--;
  //       element.style.top = pos + 'px';
  //       requestAnimationFrame(fade);
  //     }
  //   })();
  // }
  //
  // enemyKilledFadeOut(e, enemy, id) {
  //   const element = e;
  //   element.style.opacity = 1;
  //   element.style.display = 'block';
  //
  //   const fade = () => {
  //     let val = parseFloat(element.style.opacity);
  //
  //     if (!((val - 0.01) < 0)) {
  //       val -= 0.01;
  //       element.style.opacity = val;
  //       requestAnimationFrame(fade);
  //     } else {
  //       this.completePhase(enemy, id);
  //     }
  //   };
  //
  //   fade();
  // }
  //
  // showDamageOverHead() {
  //   const STYLE = { display: 'none' };
  //   return (
  //     <div
  //       id={"dmg-display" + this.props.position}
  //       className="damage-display"
  //     >
  //       {this.dmg}
  //     </div>
  //   );
  // }

  render() {
    const { state, position } = this.props;
    const { attacker } = state.whoIsAttacking;
    const enemyId = `enemy${position}`;
    attacker === enemyId && enemyAttackFX();

    // const DMG_DISPLAY = document.getElementById(`dmg-display${this.props.position}`);
    if (!state.enemyStats[position - 1].killed) {
      return (
        <div>
          <div
            id={enemyId}
            className={`enemy-sprites ${this.props.classes} ${enemyId}`}
          >
            {/*{this.showDamageOverHead()}*/}
          </div>
        </div>
      );
    }

    return null;
  }
}

Enemy.propTypes = {
  classes: PropTypes.string,
  position: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
