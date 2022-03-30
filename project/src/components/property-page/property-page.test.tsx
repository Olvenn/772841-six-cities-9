import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import PropertyPage from './property-page';
import { makeFakeOffers, ALLOFFERS, NEARBY, FAVORITES } from '../../mocks';
import { Route, Routes } from 'react-router-dom';
import * as Redux from 'react-redux';

const fakeOffersNearby = makeFakeOffers(NEARBY);
const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeFavorites = makeFakeOffers(FAVORITES);
const mockStore = configureMockStore();
const history = createMemoryHistory();

history.push(`/offer/${fakeOffers[0].id}`);

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
  OFFERS: {
    offers: fakeOffers,
    isLoading: true,
    offersNearby: fakeOffersNearby,
  },
  FAVORITES: {
    favorites: fakeFavorites,
  },
  COMMENTS: {
    comments: [],
    isLoading: true,
  },
});

describe('Component: Property', () => {

  it('should render correctly property page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Property}
              element={<PropertyPage />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider >,
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffers[0].description}`)).toBeInTheDocument();
  });
});
