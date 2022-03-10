import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { mainReducer } from './reducers/reducer-main';
import { propertyReducer } from './reducers/reducer-property';

const reducer = combineReducers({
  main: mainReducer,
  property: propertyReducer,
});


export const store = configureStore({ reducer });
