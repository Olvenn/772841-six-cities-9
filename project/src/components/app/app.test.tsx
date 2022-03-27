import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import userEvent from '@testing-library/user-event';
import { makeFakeOffers, makeFakeCity, ALLOFFERS, NEARBY } from '../../mocks';

const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeOffersNearby = makeFakeOffers(NEARBY);
const fakeCity = makeFakeCity();
const fakeFavorites = makeFakeOffers(ALLOFFERS);
const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
  OFFERS: {
    town: fakeCity,
    offers: fakeOffers,
    isLoading: true,
    activeOffer: undefined,
    changedOffer: undefined,
    offersNearby: fakeOffersNearby,
  },
  FAVORITES: {
    favorites: fakeFavorites,
  },
  COMMENTS: {
    comments: [],
    isLoading: true,
  },
  MAIN: { error: '' },
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

  // it('should render "Property" when user navigate to "/property"', async () => {
  //   const fakeId = fakeOffers[0].id.toString();
  //   history.push(`/offer/:${fakeId}`);

  //   render(fakeApp);

  // expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  // expect(screen.queryByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  // offer/:id
  // expect(screen.queryByText(/Meet the host/i)).toBeInTheDocument();
  // });

});
