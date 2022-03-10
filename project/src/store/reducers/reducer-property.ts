import { createReducer } from '@reduxjs/toolkit';
import { setComments, setOffersNearby } from './../action';
import { reviews } from '../../mock/mock';
import { offers } from '../../mock/offers';


const initialState = {
  review: undefined,
  reviews: reviews,
  offersNearby: offers,
};

const propertyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    });
});

export { propertyReducer };

// .addCase(checkUserAnswer, (state, action) => {
//   const {question, userAnswer} = action.payload;

//   state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
// })
