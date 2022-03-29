import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortForm from './sort-form';
import { SortTypes, AppRoute } from '../../const';

const mockStore = configureMockStore();

describe('Component: SortForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const onSortClick = jest.fn();
    history.push(AppRoute.Root);

    history.push('/login');
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SortForm onSortClick={onSortClick} sortType={SortTypes.Default} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
