import axios from 'axios';
import _ from 'lodash';
import sortedCards from '../utils/sort';

const ROOT_URL = 'http://localhost:3000';
// New ES6 injection uses back tick `` with ${} to pass in, very cool!!!

export const GET_CHARACTER_INFO = 'GET_CHARACTER_INFO';

export function fetchCharacters() {
  const url = `${ROOT_URL}/characters`;
  const request = axios.get(url)
    .then(response => {
      return response.data[0];
    });

  return {
    type: GET_CHARACTER_INFO,
    payload: request
  };
}
