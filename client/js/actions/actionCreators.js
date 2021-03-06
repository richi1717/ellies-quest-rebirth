import types from '../constants/actionTypes';

// export const ROOT_URL = 'https://ellies-quest.firebaseio.com/';
// export const FIREBASE_API = '.json';

// export function fetchCharacters() {
//   const url = `${ROOT_URL}/characters${FIREBASE_API}`;
//   const request = axios.get(url)
//     .then(response => {
//       return response.data[0];
//     });
//   return {
//     type: types.GET_CHARACTER_INFO,
//     payload: request
//   };
// }
//
// export function fetchEnemies() {
//   const url = `${ROOT_URL}/monsters${FIREBASE_API}`;
//   const request = axios.get(url)
//     .then(response => {
//       return response.data;
//     });
//   return {
//     type: types.GET_ENEMY_INFO,
//     payload: request
//   };
// }

export function setEnemySelectedTarget(name, str) {
  return {
    type: types.SET_ENEMY_SELECTED_TARGET,
    payload: { name, str }
  };
}

export function updateEnemyStats(obj, id) {
  return {
    type: types.UPDATE_ENEMY_STATS,
    payload: obj,
    id
  };
}

export function setEnemyAttacking(boolean) {
  return {
    type: types.SET_ENEMY_ATTACKING_BOOLEAN,
    payload: boolean
  };
}

export function setHeroAttacking(boolean, id) {
  return {
    type: types.SET_HERO_ATTACKING_BOOLEAN,
    payload: boolean,
    id
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
  return {
    type: types.SET_LIST_OF_TURN_ORDER,
    payload: next
  };
}

export function setPauseBetweenTurns(boolean) {
  return {
    type: types.SET_PAUSE_BETWEEN_TURNS,
    payload: boolean
  };
}
//
// export function setNextTurnFromList(list) {
//   // console.log(list);
//   const next = list.first();
//   // console.log(next, list.toJS());
//   return {
//     type: types.GET_NEXT_TURN_FROM_LIST,
//     payload: next,
//     list: list
//   };
// }

export function setMenuAttackSelected(bool) {
  return {
    type: types.SET_MENU_ATTACK_SELECTED,
    payload: bool
  };
}

export function setMenuDefendSelected(bool, id) {
  return {
    type: types.SET_MENU_DEFEND_SELECTED,
    payload: bool,
    id
  };
}

export function setMenuItemsSelected(bool) {
  return {
    type: types.SET_MENU_ITEMS_SELECTED,
    payload: bool
  };
}

export function setMenuMagicSelected(bool) {
  return {
    type: types.SET_MENU_MAGIC_SELECTED,
    payload: bool
  };
}

export function setMenuRunSelected(bool) {
  return {
    type: types.SET_MENU_RUN_SELECTED,
    payload: bool
  };
}

export function deleteEnemyWhenKilled(position) {
  return {
    type: types.DELETE_ENEMY_WHEN_KILLED,
    payload: position
  };
}

export function shouldPlayBackgroundMusic(bool) {
  return {
    type: types.BACKGROUND_MUSIC_SWITCH,
    isBackgroundMusicOn: bool
  };
}
