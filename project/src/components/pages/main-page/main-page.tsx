import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import Main from '../../main/main';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer, FunctionNumber } from '../../../types/types';
import { AuthorizationStatus } from '../../../const';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type MainPageProps = {
  offerCount: number;
  userName: string;
  cities: StringArray;
  isNearPlace: boolean;
  offer: Offer;
  offers: Offer[];
  activeOffer: number;
  favoritesId: number[];
  onFavoriteClick: FunctionNumber;
}

const isOffers = true;

function MainPage({ userName, cities, offerCount, isNearPlace, offer, offers, activeOffer, favoritesId, onFavoriteClick }: MainPageProps): JSX.Element {
  const [cityActive, setActiveCity] = useState('Paris');

  //как правильно
  const handleCityClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    // eslint-disable-next-line no-console
    console.log('city', evt.target.closest('span').innerText);

    setActiveCity(evt.target.closest('span').innerText);
  };

  return (
    <div className="page page--gray page--main">
      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}
      <main className={`${isOffers ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {(Object.entries(cities)).map(([key, city]) => (
                <li key={key} onClick={handleCityClick} className="locations__item">
                  <Link className={city === cityActive ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'} to='/'>
                    <span>{key}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {isOffers ? <Main offerCount={offerCount} isNearPlace={isNearPlace} offers={offers} activeOffer={activeOffer} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} cityActive={cityActive} /> : <MainEmpty />}
      </main>
    </div>
  );
}
export default MainPage;
