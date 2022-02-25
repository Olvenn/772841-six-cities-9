import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import MainNotEmptyProps from '../../main-not-empty/main-not-empty';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer, FunctionNumber } from '../../../types/types';
import { AuthorizationStatus } from '../../../const';
import { Link } from 'react-router-dom';

type MainPageProps = {
  offerCount: number;
  userName: string;
  cities: StringArray;
  isNearPlace: boolean;
  offer: Offer;
  offers: Offer[];
  activeOffer: number;
  favoritesId: number[];
  handelFavoritesClick: FunctionNumber;
}

const isOffers = true;

function MainPage({ userName, cities, offerCount, isNearPlace, offer, offers, activeOffer, favoritesId, handelFavoritesClick }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}
      <main className={`${isOffers ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {(Object.entries(cities)).map(([key, city]) => (
                <li key={key} className="locations__item">
                  <Link className={city === 'Amsterdam' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to='/'>
                    <span>{key}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {isOffers ? <MainNotEmptyProps offerCount={offerCount} isNearPlace={isNearPlace} offers={offers} activeOffer={activeOffer} favoritesId={favoritesId} handelFavoritesClick={handelFavoritesClick} /> : <MainEmpty />}
      </main>
    </div>
  );
}
export default MainPage;
