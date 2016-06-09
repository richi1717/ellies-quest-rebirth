import axios from 'axios';
import _ from 'lodash';
import * as types from '../constants/action_types';
import { fromJS } from 'immutable';

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
  console.log(id);
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

export function setHeroAttackingPos2(boolean) {
  return {
    type: types.SET_HERO_ATTACKING_POS2_BOOLEAN,
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

export function setListOfTurnOrder(next) {
  // let next = list;
  // if (typeof next !== 'string') {
  //   // console.log(list);
  //   next = list.first();
  //   // console.log(next.toArray());
  // }
  // // console.log(next);
  return {
    type: types.SET_LIST_OF_TURN_ORDER,
    payload: next
  };
}

export function setNextTurnFromList(list) {
  const next = list.first();
  console.log(list.toJS(), next);
  // // console.log(list);
  // const orig = fromJS({
  //   arrayOfValues: [
  //     { one: { inside: 'first in array' } },
  //     { one: { inside: 'second in array' } }
  //   ]
  // });
  //
  // const updated = orig.setIn(['arrayOfValues', 1, 'one', 'inside'], 'updated value');
  //
  // console.log(updated.toJS(), orig.toJS);
  //
  // const remains = list.toArray().slice(1);
  // console.log(next, list.toArray(), remains);
  // // updateTurnFromList(list)
  return {
    type: types.GET_NEXT_TURN_FROM_LIST,
    payload: next,
    list: list
  };
}
