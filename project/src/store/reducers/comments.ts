import { createSlice } from '@reduxjs/toolkit';
import { COMMENTS } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: COMMENTS = {
  comments: [],
  isLoading: true,
};

export const comments = createSlice({
  name: NameSpace.comments,
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setComments, setIsLoading } = comments.actions;
