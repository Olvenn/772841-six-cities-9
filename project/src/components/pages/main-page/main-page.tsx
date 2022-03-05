import { useAppDispatch, useAppSelector } from '../../../hooks/';
import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import Main from '../../main/main';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer, FunctionOffers, FunctionString } from '../../../types/types';
import { AuthorizationStatus } from '../../../const';
import CitiesList from '../../cities-list/cities-list';
import { changeCity, getActiveOffer } from '../../../store/action';

type MainPageProps = {
  userName: string;
  cities: StringArray;
  isNearPlace: boolean;
  offer: Offer;
  onFavoriteClick: FunctionOffers;
}

const isOffers = true;

function MainPage({ userName, cities, isNearPlace, offer, onFavoriteClick }: MainPageProps): JSX.Element {
  const { accommodations, town } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const handleCityClick: FunctionString = (city: string) => {
    dispatch(getActiveOffer(-1));
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}
      <main className={`${accommodations ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
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
        {isOffers ? <Main isNearPlace={isNearPlace} onFavoriteClick={onFavoriteClick} cityActive={town} /> : <MainEmpty />}
      </main>
    </div>
  );
}
export default MainPage;
