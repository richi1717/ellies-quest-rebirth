import axios from 'axios';
import _ from 'lodash';
import * as types from '../constants/action_types';

export const ROOT_URL = 'http://localhost:3000';

export function fetchCharacters() {
  const url = `${ROOT_URL}/characters`;
  const request = axios.get(url)
    .then(response => {
      return response.data[0];
    });
  return {
    type: types.GET_CHARACTER_INFO,
    payload: request
  };
}

export function fetchEnemies() {
  const url = `${ROOT_URL}/monsters`;
  const request = axios.get(url)
    .then(response => {
      return response.data;
    });
  return {
    type: types.GET_ENEMY_INFO,
    payload: request
  };
}

export function setBattleScene(area) {
  return {
    type: types.SET_BATTLE_SCENE,
    payload: area
  };
}

export function getEnemySelectedTarget(name, str) {
  return {
    type: types.SET_ENEMY_SELECTED_TARGET,
    payload: { name, str }
  };
}

export function updateCharacterStats(obj) {
  return {
    type: types.UPDATE_CHARACTER_STATS,
    payload: obj
  };
}

export function updateEnemyStats(obj, id) {
  return {
    type: types.UPDATE_ENEMY_STATS,
    id: id,
    payload: obj
  };
}

export function setEnemyAttacking(boolean) {
  return {
    type: types.SET_ENEMY_ATTACKING_BOOLEAN,
    payload: boolean
  };
}

export function setHeroAttacking(boolean) {
  return {
    type: types.SET_HERO_ATTACKING_BOOLEAN,
    payload: boolean
  };
}

export function setHeroToEnemyTarget(boolean, target) {
  return {
    type: types.SET_HERO_TO_ENEMY_TARGET,
    payload: boolean,
    targetNum: target
  };
}
