import { combineReducers } from 'redux-immutable';
import characterInfo from './reducer_character-info';
import enemies from './reducer_enemy-info';
import battleScene from './reducer_battle-scene';
import targetForAttack from './reducer_set-enemy-selected-target';
import updateCharacterStats from './reducer_update-character-stats';
import isEnemyAttacking from './reducer_set-enemy-attacking-boolean';

const rootReducer = combineReducers({
  characterInfo,
  battleScene,
  targetForAttack,
  updateCharacterStats,
  isEnemyAttacking
});

export default rootReducer;
