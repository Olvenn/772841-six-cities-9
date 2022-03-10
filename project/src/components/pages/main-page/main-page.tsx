import { useAppDispatch, useAppSelector } from '../../../hooks/';
import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import Main from '../../main/main';
import MainEmpty from '../../main-empty/main-empty';
import { StringArray, Offer, FunctionString } from '../../../types/types';
import { AuthorizationStatus } from '../../../const';
import CitiesList from '../../cities-list/cities-list';
import { changeCity, getActiveOffer } from '../../../store/action';

type MainPageProps = {
  userName: string;
  cities: StringArray;
  isNearPlace: boolean;
  offer: Offer;
}

const isOffers = true;

function MainPage({ userName, cities, isNearPlace, offer }: MainPageProps): JSX.Element {
  const { offers, town } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const handleCityClick: FunctionString = (city: string) => {
    dispatch(getActiveOffer(-1));
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}
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
        {isOffers ? <Main isNearPlace={isNearPlace} cityActive={town} /> : <MainEmpty />}
      </main>
    </div>
  );
}
export default MainPage;
