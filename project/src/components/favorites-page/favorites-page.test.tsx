import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoritesPage from './favorites-page';
import { AppRoute } from '../../const';
import { NameSpace, AuthorizationStatus } from '../../const';
import { makeFakeOffers, FAVORITES } from '../../mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeFavorites = makeFakeOffers(FAVORITES);
const history = createMemoryHistory();
history.push(AppRoute.Favorites);

describe('Component: Favorites', () => {
  it('should render correctly when there is at least one offer', () => {
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: fakeFavorites,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: 'test@test.ru',
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>);
      </Provider>,
    );
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render correctly when there are no offers', () => {
    const store = mockStore({
      [NameSpace.Favorites]: {
        favorites: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: 'test@test.ru',
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>);
      </Provider>,
    );
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
