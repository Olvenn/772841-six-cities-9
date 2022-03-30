import { comments, setComments } from './comments';
import { makeFakeComments } from '../../mocks';

const COMMENTS = 3;

const fakeComments = makeFakeComments(COMMENTS);

describe('Reducer: COMMENTS', () => {
  it('without additional parameters should return initial state', () => {
    expect(comments.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        comments: [],
        isLoading: true,
      });
  });

  it('should update comments by load comments', () => {
    const state = {
      comments: [],
      isLoading: true,
    };
    expect(comments.reducer(state, setComments(fakeComments)))
      .toEqual({
        comments: fakeComments,
        isLoading: true,
      });
  });
});
