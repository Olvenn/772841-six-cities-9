import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import SortOption from './sort-options';
import { AppRoute, SortTypes } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: SortOption', () => {
  it('should render correctly Default', () => {
    const onSortClick = jest.fn();
    const onSortChangeClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            {
              <Route
                path={AppRoute.Root}
                element={<SortOption onSortChangeClick={onSortChangeClick} onSortClick={onSortClick} key={'Default'} value={'Default' as SortTypes} label={'Popular'} optionActive={'Default'} />}
              />
            }
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
    expect(screen.queryByText(/PriceHighToLow/i)).not.toBeInTheDocument();
  });

  it('should render correctly', () => {
    const onSortClick = jest.fn();
    const onSortChangeClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            {
              <Route
                path={AppRoute.Root}
                element={
                  <SortOption
                    onSortChangeClick={onSortChangeClick}
                    onSortClick={onSortClick}
                    key={'PriceHighToLow'}
                    value={'PriceHighToLow' as SortTypes}
                    label={'Price: high to low'}
                    optionActive={'PriceHighToLow'}
                  />
                }
              />
            }
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Price: high to low/i)).toBeInTheDocument();
    expect(screen.queryByText(/Popular/i)).not.toBeInTheDocument();
  });
});
