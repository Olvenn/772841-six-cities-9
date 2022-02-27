import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../pages/main-page/main-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import PropertyPage from '../pages/property-page/property-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page';
import { StringArray, Offer } from '../../types/types';
import { favorites } from '../../mock/favorites';
import { useState } from 'react';

type AppProps = {
  offerCount: number;
  userName: string;
  cities: StringArray;
  isEmpty: boolean;
  isNearPlace: boolean;
  offer: Offer;
  offers: Offer[];
  activeOffer: number;
}

function App({ offerCount, userName, cities, isEmpty, isNearPlace, offer, offers, activeOffer }: AppProps): JSX.Element {
  favorites.filter((offer) => offer.id === 1);
  const getFavoritesId = favorites.map((favorite) => favorite.id);
  const [favoritesId, setFavoritesId] = useState<number[]>(getFavoritesId);

  const onFavoriteClick = (id: number): void => {
    if (!getFavoritesId.includes(id)) {
      const newOfferFavorite = offers.filter((newOffer) => newOffer.id === id);
      favorites.push(newOfferFavorite[0]);
      setFavoritesId([...favoritesId, id]);
    } else {
      setFavoritesId(favoritesId.filter((offer) => offer !== id));
      const index = favorites.findIndex((offer) => offer.id === id);
      favorites.splice(index, 1);
      favorites.filter((offer) => offer.id !== id);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage offerCount={offerCount} userName={userName} cities={cities} isNearPlace={isNearPlace} offer={offer} offers={offers} activeOffer={activeOffer} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage userName={userName} isEmpty={isEmpty} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Property}
          element={<PropertyPage userName={userName} isNearPlace={isNearPlace} offers={offers} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} />}
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
