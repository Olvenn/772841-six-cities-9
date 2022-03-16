import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import MainPage from '../main-page/main-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import PropertyPage from '../property-page/property-page';
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
  const isLoading = useAppSelector((state) => state.OFFERS.isLoading);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

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
