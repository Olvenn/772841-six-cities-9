import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import PropertyPage from './property-page';
import { NameSpace } from '../../const';
import { makeFakeOffers, ALLOFFERS } from '../../mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Property);
const fakeOffers = makeFakeOffers(ALLOFFERS);

const fakeStore = mockStore({
  [NameSpace.offers]: {
    offers: fakeOffers,
  },
  [NameSpace.user]: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
});
// const id = fakeOffers[0].id.toString;

describe('Component: Property', () => {
  it('should render correctly offersNearby', () => {
    // const offer = fakeOffers[0];

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <PropertyPage />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
