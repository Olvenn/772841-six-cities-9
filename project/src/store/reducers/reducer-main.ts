import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getActiveOffer, changeOffers, loadOffers, requireAuthorization, setError, getEmail } from '../action';
import { ACTIVE_TOWN, AuthorizationStatus } from '../../const';
import { favorites } from '../../mock/favorites';
import { Offer } from '../../types/types';

type InitalState = {
  town: string,
  offers: Offer[],
  idActiveOffer: number,
  favorites: Offer[],
  authorizationStatus: AuthorizationStatus,
  error: string,
  isLoading: boolean,
  email: string,
};

const initialState: InitalState = {
  town: ACTIVE_TOWN,
  offers: [],
  idActiveOffer: -1,
  favorites: favorites,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  isLoading: false,
  email: '',
};

//AuthorizationStatus.Unknown для первого входа на сайт. Мы не знаем есть токен или нет, валиден он еще или уже протух
//Не получается для   idActiveOffer установить undefined, надеюсь уточнить на консультации

const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.town = action.payload;
    })
    //добавлено
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isLoading = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getEmail, (state, action) => {
      state.email = action.payload;
    })

    .addCase(getActiveOffer, (state, action) => {
      state.idActiveOffer = action.payload;
    })
    .addCase(changeOffers, (state, action) => {
      state.offers = state.offers.map((offer) => offer.id !== action.payload.id ? offer : { ...offer, isFavorite: !offer.isFavorite });
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { mainReducer };

//Где и как я могу воспользоваться паттерном Адаптер?
