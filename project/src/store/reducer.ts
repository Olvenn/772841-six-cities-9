import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { FIRST_TOWN } from '../const';

const initialState = {
  town: FIRST_TOWN,
};
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      state.town = 'Brussels';
    });
});

export { reducer };
