import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import HistoryRouter from '../src/components/history-route/history-route';
import browserHistory from './browser-history';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchOffersAction, fetchFavoritesAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
