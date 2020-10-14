import { createStore } from 'redux';
import { IndexReducer } from './../redux/index';

export const configureStore = () => {
    return {
      ...createStore(IndexReducer)
    };
  };
  
