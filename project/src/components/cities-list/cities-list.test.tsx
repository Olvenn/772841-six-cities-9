import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ACTIVE_TOWN, NameSpace, cities, AppRoute } from '../../const';
import CitiesList from './cities-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.Offers]: {
    town: cities.Paris,
  },
});

describe('Component: CitiesList', () => {
  it('should render cities list', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList cityActive={ACTIVE_TOWN} city={cities.Paris} onClick={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(cities.Paris)).toBeInTheDocument();
  });

  it('should not redirect to anywhere when user clicked to link', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<CitiesList cityActive={ACTIVE_TOWN} city={cities.Paris} onClick={jest.fn()} />}
            />
            <Route
              path="/"
              element={<h1>{cities.Paris}</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(cities.Paris)).toBeInTheDocument();
  });
});
