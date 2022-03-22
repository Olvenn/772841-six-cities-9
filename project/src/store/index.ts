import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { redirect } from './middlewares/redirect';
import { createAPI } from '../services/api';
import { main } from './reducers/main';
import { user } from './reducers/user';
import { offers } from './reducers/offers';
import { comments } from './reducers/comments';
import { favorites } from './reducers/favorites';
import { NameSpace } from '../const';

export const api = createAPI();
export const reducer = combineReducers({
  [NameSpace.main]: main,
  [NameSpace.user]: user.reducer,
  [NameSpace.offers]: offers.reducer,
  [NameSpace.favorites]: favorites.reducer,
  [NameSpace.comments]: comments.reducer,
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
