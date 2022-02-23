import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import MainNotEmptyProps from '../../main-not-empty/main-not-empty';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer } from '../../../types/types';
import { AuthorizationStatus } from '../../../const';
import { Link } from 'react-router-dom';

type MainPageProps = {
  offerCount: number;
  userName: string;
  citiesList: StringArray;
  isNearPlace: boolean;
  offer: Offer;
  offersAll: Offer[];
  activeOffer: number;
}

const isOffers = true;

function MainPage({ userName, citiesList, offerCount, isNearPlace, offer, offersAll, activeOffer }: MainPageProps): JSX.Element {

  return (

    <div className="page page--gray page--main">


      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}

      <main className={`${isOffers ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">

              {(Object.entries(citiesList)).map(([key, city]) => (
                <li key={key} className="locations__item">
                  <Link className={city === 'Amsterdam' ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to='/'>
                    <span>{key}</span>
                  </Link>
                </li>
              ))}

            </ul>
          </section>
        </div>

        {isOffers ? <MainNotEmptyProps offerCount={offerCount} isNearPlace={isNearPlace} offersAll={offersAll} activeOffer={activeOffer} /> : <MainEmpty />}

      </main>
    </div>
  );
}

export default MainPage;
