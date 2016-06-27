import { combineReducers } from 'redux-immutable';
import characterInfo from './reducer_character-info';
import enemies from './reducer_enemy-info';
import battleScene from './reducer_battle-scene';
import getEnemySelectedTarget from './reducer_set-enemy-selected-target';
import updateCharacterStats from './reducer_update-character-stats';
import isEnemyAttacking from './reducer_get-enemy-attacking-boolean';
import isHeroAttacking from './reducer_set-hero-attacking-boolean';
import isEnemyTarget from './reducer_set-hero-to-enemy-target-boolean';
import enemyStats from './reducer_update-enemy-stats';
import getListOfTurnOrder from './reducer_set-turn-order';
import getNextTurn from './reducer_set-next-turn';
import isPauseBetweenTurns from './reducer_get-pause-between-turns';
import isMenuAttackSelected from './reducer_get-menu-attack-selected';
import isMenuDefendSelected from './reducer_get-menu-defend-selected';
import isMenuItemsSelected from './reducer_get-menu-items-selected';
import isMenuMagicSelected from './reducer_get-menu-magic-selected';
import isMenuRunSelected from './reducer_get-menu-run-selected';

const rootReducer = combineReducers({
  characterInfo,
  battleScene,
  getEnemySelectedTarget,
  updateCharacterStats,
  isEnemyAttacking,
  isHeroAttacking,
  isEnemyTarget,
  enemyStats,
  getListOfTurnOrder,
  getNextTurn,
  isPauseBetweenTurns,
  isMenuAttackSelected,
  isMenuDefendSelected,
  isMenuItemsSelected,
  isMenuMagicSelected,
  isMenuRunSelected
});

export default rootReducer;
