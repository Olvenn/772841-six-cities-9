import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import Nearby from './nearby';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Property);

const store = mockStore({
  [NameSpace.offers]: {
    offersNearby: [],
  },
});

describe('Component: NotFoundScreen', () => {
  it('should render correctly offersNearby', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Nearby />
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
