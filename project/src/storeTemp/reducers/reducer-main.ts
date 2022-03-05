import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers, getActiveOffer, setFavorites } from '../action';
import { ACTIVE_TOWN } from '../../const';
import { offers } from '../../mock/offers';
import { favorites } from '../../mock/favorites';

const initialState = {
  town: ACTIVE_TOWN,
  accommodations: offers,
  idActiveOffer: -1,
  favorites: favorites,
};
//Не получается для   idActiveOffer установить undefined

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
    .addCase(setOffers, (state, action) => {
      state.accommodations = action.payload;
    });
});

export { mainReducer };
