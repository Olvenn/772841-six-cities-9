import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers, getActiveOffer, setFavorites, setComments, setOffersNearby, changeOffer, changeSort } from './action';
import { ACTIVE_TOWN } from '../const';
import { offers } from '../mock/offers';
import { favorites } from '../mock/favorites';
import { reviews } from '../mock/mock';

const initialState = {
  town: ACTIVE_TOWN,
  accommodations: offers,
  offer: {},
  idActiveOffer: -1,
  sort: 'Popular',
  favorites: favorites,
  review: undefined,
  reviews: reviews,
  offersNearby: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.town = action.payload;
    })
    .addCase(getActiveOffer, (state, action) => {
      state.idActiveOffer = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.accommodations = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(changeOffer, (state, action) => {
      state.accommodations = state.accommodations.map((accommodation) =>
        accommodation.id === action.payload.id ? action.payload : accommodation);
    })
    .addCase(setComments, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    });
});

export { reducer };
