import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace } from '../../const';
import { AppRoute } from '../../const';
import ErrorMessage from './error-message';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Root);

const store = mockStore({
  [NameSpace.main]: { error: 'Not found' },
});

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorMessage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
