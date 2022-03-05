import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { mainReducer } from './reducers/reducer-main';
import { propertyReducer } from './reducers/reducer-property';


const reducer = combineReducers({
  mainReducer: mainReducer,
  propertyReducer: propertyReducer,
});

//Инициализируем наше хранилище
export const store = configureStore({reducer});




