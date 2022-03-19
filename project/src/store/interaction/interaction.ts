import { createSlice } from '@reduxjs/toolkit';
import { Interaction } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: Interaction = {
  favorites: [],
  comments: [],
  isLoading: true,
};

export const interaction = createSlice({
  name: NameSpace.interaction,
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeFavorite: (state, action) => {
      state.favorites = (action.payload.isFavorite) ? [action.payload, ...state.favorites] : state.favorites.filter((item) => item.id !== action.payload.id);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loadFavorites, changeFavorite, setComments, setIsLoading } = interaction.actions;
