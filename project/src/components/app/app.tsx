import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { StringArray, Offer } from '../../types/types';
import MainPage from '../pages/main-page/main-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import PropertyPage from '../pages/property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch } from '../../hooks/';
import { setFavorites } from '../../store/action';


type AppProps = {
  userName: string;
  cities: StringArray;
  isEmpty: boolean;
  isNearPlace: boolean;
  offer: Offer;
  offers: Offer[];
}

function App({ userName, cities, isEmpty, isNearPlace, offer, offers }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (favorites: Offer[], favorite: Offer): void => {
    const isFavorites = favorites.some((item) => item.id === favorite.id);
    if (!isFavorites) {
      const newfavorites = [favorite, ...favorites];
      dispatch(setFavorites(newfavorites));
    } else {
      const newfavorites = favorites.filter((item) => item.id !== favorite.id);
      dispatch(setFavorites(newfavorites));
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage userName={userName} cities={cities} isNearPlace={isNearPlace} offer={offer} onFavoriteClick={handleFavoriteClick} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage userName={userName} isEmpty={isEmpty} onFavoriteClick={handleFavoriteClick} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Property}
          element={<PropertyPage userName={userName} isNearPlace={isNearPlace} offers={offers} onFavoriteClick={handleFavoriteClick} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
