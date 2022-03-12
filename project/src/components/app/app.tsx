import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import MainPage from '../pages/main-page/main-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import PropertyPage from '../pages/property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import { isCheckedAuth } from '../../main';
import browserHistory from '../../browser-history';

type AppProps = {
  cities: { [index: string]: string };
  isNearPlace: boolean;
}

function App({ cities, isNearPlace }: AppProps): JSX.Element {
  const { authorizationStatus, isLoading } = useAppSelector((state) => state.main);

  if (isCheckedAuth(authorizationStatus) || !isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage cities={cities} isNearPlace={isNearPlace} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Property}
          element={<PropertyPage isNearPlace={isNearPlace} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}
export default App;
