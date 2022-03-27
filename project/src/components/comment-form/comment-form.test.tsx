import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CommentForm from './comment-form';

const mockStore = configureMockStore();

describe('Component: AuthScreen', () => {
  it('should render "AuthScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');
    const fakeId = 1;
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CommentForm offerId={fakeId} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});


