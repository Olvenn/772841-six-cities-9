import { user, requireAuthorization, getEmail } from './user';
import { AuthorizationStatus } from '../../const';
import { internet } from 'faker';
describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        email: '',
      });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
    };

    expect(user.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        email: '',
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: '',
    };

    expect(user.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        email: '',
      });
  });

  it('should update email', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      email: '',
    };

    expect(user.reducer(state, getEmail(internet.email)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        email: internet.email,
      });
  });
});
