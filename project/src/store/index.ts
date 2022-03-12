import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { redirect } from './middlewares/redirect';
import { createAPI } from '../services/api';
import { main } from './reducers/main';
import { property } from './reducers/property';

export const api = createAPI();
export const reducer = combineReducers({
  main: main,
  property: property,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

//А как диспачить асихронное дейсвие без Middleware?
