import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import Main from '../../main/main';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer, FunctionNumber, FunctionString } from '../../../types/types';
import { AuthorizationStatus, FIRST_TOWN } from '../../../const';
import { useState } from 'react';
import CitiesList from '../../cities-list/cities-list';

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
  const [cityActive, setActiveCity] = useState(FIRST_TOWN);
  const handleCityClick: FunctionString = (city: string) => {
    setActiveCity(city);
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
                <CitiesList
                  key={key}
                  city={city}
                  onClick={handleCityClick}
                  cityActive={cityActive}
                />
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
