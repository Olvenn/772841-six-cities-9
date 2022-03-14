import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../store';
import { store } from '../store';
import { Offer } from '../types/types';
import { loadOffers, requireAuthorization, setError, getEmail, redirectToRoute, loadFavorites, changeFavorite, changeOffers } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, AppRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
//      errorHandle(error); - самописная функция

export const clearErrorAction = createAsyncThunk(
  'main/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
export const changeFavoriteAction = createAsyncThunk(
  'user/changeFavorites',

  async (offer: Offer) => {
    try {
      const status = Number(!offer.isFavorite);
      const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${offer.id}/${status}`);
      store.dispatch(changeFavorite(data));
      store.dispatch(changeOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
// export const changeFavoriteAction = createAsyncThunk(
//   'user/changeFavorites',
//   async (favorite: Favorite) => {
//     const {offer, authorizationStatus} = favorite;
//     try {
//       if(authorizationStatus !== AuthorizationStatus.Auth) {
//         return;
//       }
//       const status = Number(!offer.isFavorite);
//       const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${offer.id}/${status}`);
//     } catch (error) {
//       errorHandle(error);
//     }
//   },
// );
export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const { data } = await api.get(APIRoute.Login);
      store.dispatch(getEmail(data.email));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(getEmail(email));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
    }
  },
);
export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(getEmail(''));
    } catch (error) {
      errorHandle(error);
    }
  },
);
