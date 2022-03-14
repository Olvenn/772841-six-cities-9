import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import { cities } from './const';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchOffersAction, fetchFavoritesAction } from './store/api-actions';

const Setting = {
  CITY: cities,
  IS_NEAR_PLACE: false,
};

// eslint-disable-next-line no-console
// console.log(offers);

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        cities={Setting.CITY}
        isNearPlace={Setting.IS_NEAR_PLACE}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
