import { createReducer } from '@reduxjs/toolkit';
import { setError } from '../action';

type InitalState = {
  error: string,
};

const initialState: InitalState = {
  error: '',
};

const main = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { main };
