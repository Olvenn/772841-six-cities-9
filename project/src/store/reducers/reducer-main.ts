import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getActiveOffer, setFavorites, changeOffers } from '../action';
import { ACTIVE_TOWN } from '../../const';
import { offers } from '../../mock/offers';
import { favorites } from '../../mock/favorites';

const initialState = {
  town: ACTIVE_TOWN,
  offers: offers,
  idActiveOffer: -1,
  favorites: favorites,
};
//Не получается для   idActiveOffer установить undefined, надеюсь уточнить на консультации

const mainReducer = createReducer(initialState, (builder) => {
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
    .addCase(changeOffers, (state, action) => {
      state.offers = state.offers.map((offer) => offer.id !== action.payload.id ? offer : { ...offer, isFavorite: !offer.isFavorite });
    });
});

export { mainReducer };
