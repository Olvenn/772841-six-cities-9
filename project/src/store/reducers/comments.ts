import { createSlice } from '@reduxjs/toolkit';
import { COMMENTS } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: COMMENTS = {
  comments: [],
  isLoading: true,
  isSuccessfully: 0,
};

export const comments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccessfully: (state, action) => {
      state.isSuccessfully = action.payload;
    },
  },
});

export const { setComments, setIsLoading, setSuccessfully } = comments.actions;
