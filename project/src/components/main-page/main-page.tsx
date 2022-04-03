import { useAppDispatch, useAppSelector } from '../../hooks/';
import { useCallback } from 'react';
import PageHeader from '../page-header/page-header';
import Main from '../main/main';
import MainEmpty from '../main-empty/main-empty';
import CitiesList from '../cities-list/cities-list';
import { getActiveOffer } from '../../store/reducers/offers';
import { changeCity } from '../../store/reducers/offers';
import { NameSpace, cities } from '../../const';

function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state[NameSpace.Offers].offers);
  const town = useAppSelector((state) => state[NameSpace.Offers].town);
  const dispatch = useAppDispatch();

  const handleCityClick: (item: string) => void = useCallback((city: string) => {
    dispatch(getActiveOffer(-1));
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      {<PageHeader />}
      <main className={`${offers ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {(Object.entries(cities)).map(([key, city]) => (
                <CitiesList
                  key={key}
                  city={city}
                  onClick={handleCityClick}
                  cityActive={town}
                />
              ))}
            </ul>
          </section>
        </div>
        {offers.length ? <Main cityActive={town} /> : <MainEmpty />}
      </main>
    </div>
  );
}
export default MainPage;
