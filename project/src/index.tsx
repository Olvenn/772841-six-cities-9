import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { citiesList } from './const';

const Setting = {
  OFFER_COUNT: 312,
  USER_NAME: 'Oliver.conner@gmail.com ',
  CITY: citiesList,
  IS_EMPTY: true,
  IS_NEAR_PLACE: false,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCount={Setting.OFFER_COUNT}
      userName={Setting.USER_NAME}
      citiesList={Setting.CITY}
      isEmpty={Setting.IS_EMPTY}
      isNearPlace={Setting.IS_NEAR_PLACE}
    />
  </React.StrictMode>,
  document.getElementById('root'));
