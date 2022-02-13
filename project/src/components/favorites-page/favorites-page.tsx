import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesPageProps = {
  userName: string;
  isEmpty: boolean;
}

function FavoritesPage({ userName, isEmpty }: FavoritesPageProps): JSX.Element {
  return (

    <div className="page">
      <PageHeader userName={userName} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">

          {isEmpty ? (

            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">

                    {[...Array(2)].map((e, i) => <article className="favorites__card place-card" key={Math.random()}><FavoriteCard /></article>)}

                  </div>
                </li>

                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">

                    {[...Array(1)].map((e, i) => <article className="favorites__card place-card" key={Math.random()}><FavoriteCard /></article>)}

                  </div>
                </li>
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
