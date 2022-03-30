import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute, NameSpace } from '../../const';
import userEvent from '@testing-library/user-event';
import { makeFakeOffers, makeFakeCity, ALLOFFERS, NEARBY } from '../../mocks';
import App from './app';

const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeOffersNearby = makeFakeOffers(NEARBY);
const fakeCity = makeFakeCity();
const fakeFavorites = makeFakeOffers(ALLOFFERS);
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.user]: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
  [NameSpace.offers]: {
    town: fakeCity,
    offers: fakeOffers,
    isLoading: true,
    activeOffer: undefined,
    changedOffer: undefined,
    offersNearby: fakeOffersNearby,
  },
  [NameSpace.favorites]: {
    favorites: fakeFavorites,
  },
  [NameSpace.comments]: {
    comments: [],
    isLoading: true,
  },
  [NameSpace.main]: { error: '' },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {

  it('should render "Root" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorite"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should not render "Favorites" when user has  AuthorizationStatus.NoAuth"', () => {
    history.push(AppRoute.Favorites);
    const storeNew = mockStore({
      [NameSpace.user]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        email: 'test@test.ru',
      },
      [NameSpace.offers]: {
        isLoading: true,
      },
      [NameSpace.favorites]: {
        favorites: fakeFavorites,
      },
    });
    render(
      <Provider store={storeNew}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@test.ru');
    userEvent.type(screen.getByPlaceholderText(/Password/i), '123456');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should render "Property" when user navigate to "/property"', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Property.replace(':id', fakeOffers[0].id.toString()));

    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });
});
