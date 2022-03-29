import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Comments from './comments';
import { AppRoute } from '../../const';
import { NameSpace } from '../../const';
import { makeFakeComments, COMMENTS } from '../../mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const comments = makeFakeComments(COMMENTS);
const history = createMemoryHistory();
history.push(AppRoute.Property);

const store = mockStore({
  [NameSpace.comments]: {
    comments: comments,
    isLoading: true,
  },
});

describe('Component: Comments', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Comments />
        </HistoryRouter>);
      </Provider>,
    );
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
