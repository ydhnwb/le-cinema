import { combineReducers } from 'redux';
import { authReducer } from './auth_reducer';
import { movieReducer } from './movie_reducer';

export const IndexReducer = combineReducers({
  authReducer,
  movieReducer
});