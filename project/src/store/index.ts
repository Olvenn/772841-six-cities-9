import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
//Инициализируем наше хранилище
export const store = configureStore({reducer});
