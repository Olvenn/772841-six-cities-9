import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CommentForm from './comment-form';
import { AppRoute, NameSpace, AuthorizationStatus } from '../../const';
import { COMMENTS, makeFakeComments } from '../../mocks';

const mockStore = configureMockStore();
const fakeComments = makeFakeComments(COMMENTS);

const store = mockStore({
  [NameSpace.user]: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'test@test.ru',
  },
  [NameSpace.comments]: {
    comments: fakeComments,
    isLoading: true,
  },
});

const history = createMemoryHistory();
history.push(AppRoute.Login);
const fakeId = 1;

describe('Component: CommentForm', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm offerId={fakeId} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByLabelText('comment')).toBeInTheDocument();
  });
});
