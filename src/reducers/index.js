import { combineReducers } from 'redux-immutable';
import characterInfo from './reducer_character-info';

const rootReducer = combineReducers({
  characterInfo
});

export default rootReducer;
