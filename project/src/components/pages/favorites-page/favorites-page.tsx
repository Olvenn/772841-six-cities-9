import PageHeader from '../../page-header/page-header';
import PageFooter from '../../page-footer/page-footer';
import FavoriteCard from '../../favorite-card/favorite-card';
import { favorites } from '../../../moki/favorites';
import { Link } from 'react-router-dom';
import { FunctionNumber } from '../../../types/types';

type FavoritesPageProps = {
  userName: string;
  isEmpty: boolean;
  favoritesId: number[];
  handelFavoritesClick: FunctionNumber;
}

function FavoritesPage({ userName, isEmpty, favoritesId, handelFavoritesClick }: FavoritesPageProps): JSX.Element {

  const listVCities = new Set(favorites.map((favorite) => favorite.city.name));

  return (

    <div className="page">
      <PageHeader userName={userName} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">

          {isEmpty ? (

            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  [...listVCities].map((favoriteCity: string) => (
                    <li key={Math.random()} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="/">
                            <span>{favoriteCity}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">

                        {favorites.filter((offer) => offer.city.name === favoriteCity).map((favorite) => <article className="favorites__card place-card" key={Math.random()}><FavoriteCard oneFavoriteOffer={favorite}  favoritesId={favoritesId} handelFavoritesClick={handelFavoritesClick} /></article>)}

                      </div>
                    </li>
                  ),
                  )
                }
              </ul>
            </section>

          ) : (

            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>

          )}

        </div>
      </main>
      <PageFooter />
    </div>
  );
}

export default FavoritesPage;
