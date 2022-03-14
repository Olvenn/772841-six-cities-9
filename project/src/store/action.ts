import { createAction } from '@reduxjs/toolkit';
import { Offer, Comment } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction('main/changeCity',
  (city: string) => ({
    payload: city,
  }),
);
export const loadOffers = createAction('main/loadOffers',
  (offers: Offer[]) => ({
    payload: offers,
  }),
);
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string>('main/setError');
export const getEmail = createAction<string>('main/getEmail');
export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');

export const getActiveOffer = createAction('main/getActiveOffer',
  (idActiveOffer: number) => ({
    payload: idActiveOffer,
  }),
);

//Как лучше писать - сокращенно или развернуто или вообще использовать slice
//idActiveOffer: number | undefined Не получилось, надеюсь уточнить на консультации
export const changeOffers = createAction('main/changeOffers',
  (offer: Offer) => ({
    payload: offer,
  }),
);
export const loadFavorites = createAction('main/loadFavorites',
  (offers: Offer[]) => ({
    payload: offers,
  }),
);
export const changeFavorite = createAction('main/changeFavorite',
  (offer: Offer) => ({
    payload: offer,
  }),
);
export const changeSort = createAction('main/changeSort',
  (sort: string) => ({
    payload: sort,
  }),
);
export const setComments = createAction('property/setComments',
  (comment: Comment[]) => ({
    payload: comment,
  }),
);
export const setOffersNearby = createAction('property/setOffersNearby',
  (offersNearby: Offer[]) => ({
    payload: offersNearby,
  }),
);
