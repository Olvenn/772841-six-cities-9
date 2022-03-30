import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, cities } from '../../const';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffers, ALLOFFERS } from '../../mocks';
import Main from './main';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);
const offers = makeFakeOffers(ALLOFFERS);

const store = mockStore({
  [NameSpace.offers]: {
    town: cities.Paris,
    offers: offers,
  },
  [NameSpace.user]: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
});

describe('Component: MainPage', () => {

  it('should render cities list', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main cityActive='Paris' />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });
});
