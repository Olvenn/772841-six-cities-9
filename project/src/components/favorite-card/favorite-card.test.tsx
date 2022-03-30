import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoriteCard from './favorite-card';
import { NameSpace, AuthorizationStatus } from '../../const';
import { makeFakeOffers, FAVORITES } from '../../mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const fakeFavorites = makeFakeOffers(FAVORITES);
const history = createMemoryHistory();
history.push(`/offer/:${fakeFavorites[0].id}`);

describe('Component: FavoriteCard', () => {
  const store = mockStore({
    [NameSpace.favorites]: {
      favorites: fakeFavorites,
    },
    [NameSpace.user]: {
      authorizationStatus: AuthorizationStatus.Auth,
      email: 'test@test.ru',
    },
  });
  it('should render correctly one FavoriteCard', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteCard oneFavoriteOffer={fakeFavorites[0]} />
        </HistoryRouter>);
      </Provider>,
    );
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeFavorites[0].title}`)).toBeInTheDocument();
  });
});
