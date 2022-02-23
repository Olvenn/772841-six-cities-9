import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { citiesList } from './const';
import { offer } from './moki/moki';
import { offers } from './moki/offers';

const Setting = {
  OFFER_COUNT: 312,
  USER_NAME: 'Oliver.conner@gmail.com ',
  CITY: citiesList,
  IS_EMPTY: true,
  IS_NEAR_PLACE: false,
  ACTIVE_OFFER: offers[0].id,
};

// eslint-disable-next-line no-console
console.log(offers);

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCount={Setting.OFFER_COUNT}
      userName={Setting.USER_NAME}
      citiesList={Setting.CITY}
      isEmpty={Setting.IS_EMPTY}
      isNearPlace={Setting.IS_NEAR_PLACE}
      offer={offer}
      offersAll={offers}
      activeOffer={Setting.ACTIVE_OFFER}
    />
  </React.StrictMode>,
  document.getElementById('root'));
