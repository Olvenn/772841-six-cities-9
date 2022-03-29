import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { NameSpace, AppRoute } from '../../const';
import { makeFakeComments, COMMENTS } from '../../mocks';
import CommentCard from './comment-card';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Property);
const comments = makeFakeComments(COMMENTS);
const comment = comments[0];

const store = mockStore({
  [NameSpace.comments]: {
    comments: comments,
    isLoading: true,
  },
});

describe('Component: CommentCard', () => {
  it('should render one comment', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentCard feedback={comment} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});
