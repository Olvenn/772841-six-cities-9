import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../store';
import { store } from '../store';
import { Offer, Comment } from '../types/types';
import { setError, redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, AppRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';
import { requireAuthorization, getEmail } from './user/user';
import { loadFavorites, changeFavorite, setComments, setIsLoading } from './interaction/interaction';
import { loadOffers, logoutOffers, loadOffersNearby } from './offers/offers';
import { changeOffers } from './offers/offers';

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
export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(setComments(data));
      store.dispatch(setIsLoading(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);
export const commentAction = createAsyncThunk(
  'user/comment',
  async ({ offerId, rating, comment }: CommentData) => {
    try {
      const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, { rating, comment });
      store.dispatch(setIsLoading(true));
      await store.dispatch(setComments(data));
      store.dispatch(setIsLoading(false));

    } catch (error) {
      store.dispatch(setIsLoading(false));
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
  'user/changeFavorite',
  async (offer: Offer) => {
    try {
      const status = Number(!offer.isFavorite);
      const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${offer.id}/${status}`);
      store.dispatch(changeFavorite(data));
      store.dispatch(changeOffers(data));
    } catch (error) {
      store.dispatch(redirectToRoute(AppRoute.Login));
      errorHandle(error);
    }
  },
);
export const fetchNearbyAction = createAsyncThunk(
  'user/ fetchNearby',
  async (id: number) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}${APIRoute.OffersNearby}`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
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
      store.dispatch(loadFavorites([]));
      store.dispatch(logoutOffers());
    } catch (error) {
      errorHandle(error);
    }
  },
);
