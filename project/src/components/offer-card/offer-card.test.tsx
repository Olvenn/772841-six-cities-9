import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import OfferCard from './offer-card';
import { AppRoute } from '../../const';
import { NameSpace } from '../../const';
import { makeFakeOffers, ALLOFFERS, FAVORITES } from '../../mocks';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeFavorites = makeFakeOffers(FAVORITES);
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.offers]: {
    offers: fakeOffers,
  },
  [NameSpace.favorites]: {
    favorites: fakeFavorites,
  },
});
const isNearPlace = true;

describe('Component: OfferCard', () => {
  it('should render correctly one OfferCard', () => {

    const onOfferMouseOver = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCard offer={fakeOffers[0]} isNearPlace={isNearPlace} onOfferMouseOver={onOfferMouseOver} />
        </HistoryRouter>;
      </Provider>,
    );
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffers[0].title}`)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });

  it('should click favorite button', () => {
    const onOfferMouseOver = jest.fn();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCard offer={fakeOffers[0]} isNearPlace={isNearPlace} onOfferMouseOver={onOfferMouseOver} />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByRole('button', { name: 'To bookmarks' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
