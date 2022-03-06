import { createAction } from '@reduxjs/toolkit';
import { Offer, Comment } from '../types/types';

// export const changeCity = createAction<{city: string}>('main/changeCity');
export const changeCity = createAction('main/changeCity',
  (city: string) => ({
    payload: city,
  }),
);

export const setOffers = createAction('main/setOffers',
  (accommodations: Offer[]) => ({
    payload: accommodations,
  }),
);
export const getActiveOffer = createAction('main/getActiveOffer',
  (idActiveOffer: number) => ({
    payload: idActiveOffer,
  }),
);
//idActiveOffer: number | undefined

export const changeOffer = createAction('main/changeFavorite',
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const setFavorites = createAction('main/setFavorites',
  (offers: Offer[]) => ({
    payload: offers,
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
