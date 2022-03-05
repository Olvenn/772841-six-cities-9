import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import { cities } from './const';
import { offer } from './mock/mock';
import { offers } from './mock/offers';

const Setting = {
  USER_NAME: 'Oliver.conner@gmail.com ',
  CITY: cities,
  IS_EMPTY: true,
  IS_NEAR_PLACE: false,
};

// eslint-disable-next-line no-console
console.log(offers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        userName={Setting.USER_NAME}
        cities={Setting.CITY}
        isEmpty={Setting.IS_EMPTY}
        isNearPlace={Setting.IS_NEAR_PLACE}
        offer={offer}
        offers={offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
