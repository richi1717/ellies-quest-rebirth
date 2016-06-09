import { combineReducers } from 'redux-immutable';
import characterInfo from './reducer_character-info';
import enemies from './reducer_enemy-info';
import battleScene from './reducer_battle-scene';
import targetForAttack from './reducer_set-enemy-selected-target';
import updateCharacterStats from './reducer_update-character-stats';
import isEnemyAttacking from './reducer_set-enemy-attacking-boolean';
import isHeroAttacking from './reducer_set-hero-attacking-boolean';
import isEnemyTarget from './reducer_set-hero-to-enemy-target-boolean';
import enemyStats from './reducer_update-enemy-stats';
import getListOfTurnOrder from './reducer_set-turn-order';
import getNextTurn from './reducer_set-next-turn';

const rootReducer = combineReducers({
  characterInfo,
  battleScene,
  targetForAttack,
  updateCharacterStats,
  isEnemyAttacking,
  isHeroAttacking,
  isEnemyTarget,
  enemyStats,
  getListOfTurnOrder,
  getNextTurn
});

export default rootReducer;
