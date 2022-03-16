import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { redirect } from './middlewares/redirect';
import { createAPI } from '../services/api';
import { main } from './main';
import { user } from './user/user';
import { offers } from './offers/offers';
import { interaction } from './interaction/interaction';
import { NameSpace } from '../const';

export const api = createAPI();
export const reducer = combineReducers({
  main: main,
  [NameSpace.user]: user.reducer,
  [NameSpace.offers]: offers.reducer,
  [NameSpace.interaction]: interaction.reducer,
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
