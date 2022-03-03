import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import { cities } from './const';
import { offer } from './mock/mock';
import { offers } from './mock/offers';

const Setting = {
  OFFER_COUNT: 312,
  USER_NAME: 'Oliver.conner@gmail.com ',
  CITY: cities,
  IS_EMPTY: true,
  IS_NEAR_PLACE: false,
  ACTIVE_OFFER: offers[0].id,
};

// eslint-disable-next-line no-console
console.log(offers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offerCount={Setting.OFFER_COUNT}
        userName={Setting.USER_NAME}
        cities={Setting.CITY}
        isEmpty={Setting.IS_EMPTY}
        isNearPlace={Setting.IS_NEAR_PLACE}
        offer={offer}
        offers={offers}
        activeOffer={Setting.ACTIVE_OFFER}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
