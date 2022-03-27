import { createSlice } from '@reduxjs/toolkit';
import { FAVORITES } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: FAVORITES = {
  favorites: [],
};

export const favorites = createSlice({
  name: NameSpace.favorites,
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeFavorite: (state, action) => {
      state.favorites = (action.payload.isFavorite) ? [action.payload, ...state.favorites] : state.favorites.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { loadFavorites, changeFavorite } = favorites.actions;
