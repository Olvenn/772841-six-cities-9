import PageHeader from '../page-header/page-header';
import OfferCard from '../offer-card/offer-card';
import { StringArray } from '../../const';

type MainPageProps = {
  offerCount: number;
  userName: string;
  citiesList: StringArray;
}

function MainPage({ offerCount, userName, citiesList }: MainPageProps): JSX.Element {

  return (
    <div className="page page--gray page--main">

      <PageHeader userName={userName} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">

              {(Object.entries(citiesList)).map(([key, city]) => (
                <li key={key} className="locations__item">
                  <a className={city === 'Amsterdam' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} href="#">
                    <span>{key}</span>
                  </a>
                </li>
              ))}

            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {[...Array(5)].map((e, i) => <article className="cities__place-card place-card" key={Math.random()}><OfferCard /></article>)}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default MainPage;