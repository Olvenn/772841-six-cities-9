import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import MainPage from './main-page';
import { NameSpace, cities } from '../../const';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffers, ALLOFFERS } from '../../mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);
const offers = makeFakeOffers(ALLOFFERS);

const store = mockStore({
  [NameSpace.Offers]: {
    town: cities.Paris,
    offers: offers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
});

describe('Component: MainPage', () => {
  it('should render cities list', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
