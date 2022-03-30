import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import PageHeader from './page-header';
import { NameSpace } from '../../const';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: page-header', () => {
  it('should render correctly AuthorizationStatus = Auth', () => {
    const store = mockStore({
      [NameSpace.user]: { authorizationStatus: AuthorizationStatus.Auth, email: 'test@test.ru' },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly AuthorizationStatus != Auth', () => {
    const store = mockStore({
      [NameSpace.user]: { authorizationStatus: AuthorizationStatus.NoAuth || AuthorizationStatus.Unknown, email: '' },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>,
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link /login', () => {
    const store = mockStore({
      [NameSpace.user]: { authorizationStatus: AuthorizationStatus.NoAuth, email: '' },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should redirect to favorites url when user clicked to email', () => {
    const store = mockStore({
      [NameSpace.user]: { authorizationStatus: AuthorizationStatus.Auth, email: 'test' },
    });
    history.push('/');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is favorites page</h1>}
            />
            <Route
              path={AppRoute.Root}
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is favorites page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/test/i));
    expect(screen.getByText(/This is favorites page/i)).toBeInTheDocument();
  });

  it('should redirect to favorites url when user clicked to sign out', () => {
    const store = mockStore({
      [NameSpace.user]: { authorizationStatus: AuthorizationStatus.Auth, email: 'test' },
    });
    history.push('/');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<PageHeader />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
