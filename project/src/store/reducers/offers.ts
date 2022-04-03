import { createSlice } from '@reduxjs/toolkit';
import { OffersProcess } from '../../types/state';
import { ACTIVE_TOWN, NameSpace } from '../../const';

const initialState: OffersProcess = {
  town: ACTIVE_TOWN,
  offers: [],
  isLoading: false,
  activeOffer: undefined,
  changedOffer: undefined,
  offersNearby: [],
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.town = action.payload;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isLoading = true;
    },
    changeOffers: (state, action) => {
      state.offers = state.offers.map((offer) => offer.id !== action.payload.id ? offer : { ...offer, isFavorite: !offer.isFavorite });
    },
    getActiveOffer: (state, action) => {
      state.activeOffer = action.payload;
    },
    getChangedOfferId: (state, action) => {
      state.changedOffer = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
    },
    logoutOffers: (state) => {
      state.town = ACTIVE_TOWN;
      state.activeOffer = undefined;
    },
  },
});

export const { changeCity, loadOffers, changeOffers, getActiveOffer, logoutOffers, loadOffersNearby, getChangedOfferId } = offers.actions;
