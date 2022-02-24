import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../pages/main-page/main-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import PropertyPage from '../pages/property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';
import { StringArray, Offer } from '../../types/types';
import { favorites } from '../../moki/favorites';
import { useState } from 'react';

type AppProps = {
  offerCount: number;
  userName: string;
  citiesList: StringArray;
  isEmpty: boolean;
  isNearPlace: boolean;
  offer: Offer;
  offersAll: Offer[];
  activeOffer: number;
}

function App({ offerCount, userName, citiesList, isEmpty, isNearPlace, offer, offersAll, activeOffer }: AppProps): JSX.Element {

  favorites.filter((oneOffer) => oneOffer.id === 1);
  const getFavoritesId = favorites.map((favorite) => favorite.id);

  const [favoritesId, setFavoritesId] = useState<number[]>(getFavoritesId);

  const handelFavoritesClick = (id: number): void => {
    if(!getFavoritesId.includes(id)) {
      const newOfferFavorite = offersAll.filter((newOffer)  => newOffer.id === id);
      favorites.push(newOfferFavorite[0]);
      setFavoritesId([...favoritesId, id]);
    } else {
      setFavoritesId(favoritesId.filter((oneOffer) => oneOffer !== id));
      const index = favorites.findIndex((oneOffer) => oneOffer.id === id);
      favorites.splice(index, 1);
      favorites.filter((oneOffer) => oneOffer.id !== id);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage offerCount={offerCount} userName={userName} citiesList={citiesList} isNearPlace={isNearPlace} offer={offer} offersAll={offersAll} activeOffer={activeOffer} favoritesId={favoritesId} handelFavoritesClick={handelFavoritesClick} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage userName={userName} isEmpty={isEmpty} favoritesId={favoritesId} handelFavoritesClick={handelFavoritesClick} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Property}
          element={<PropertyPage userName={userName} isNearPlace={isNearPlace} offersAll={offersAll} favoritesId={favoritesId} handelFavoritesClick={handelFavoritesClick} />}
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

