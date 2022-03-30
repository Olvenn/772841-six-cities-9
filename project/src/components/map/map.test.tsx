import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, AuthorizationStatus } from '../../const';
import { random } from 'faker';
import { makeFakeOffers, makeFakeCity, ALLOFFERS, NEARBY } from '../../mocks';
import Map from './map';

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

describe('Component: Map', () => {
  const fakeOffer = random.arrayElement(fakeOffers);
  it('should render correctly Map', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map activePoint={fakeOffer.city} offers={fakeOffersNearby} offerActive={fakeOffers[0]} mapPlace={'property'} />
        </HistoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('Map')).toBeInTheDocument();
  });
});
