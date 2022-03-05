import { useAppDispatch, useAppSelector } from '../../hooks/';
import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import Map from '../map/map';
import { Offer, FunctionOffers, FunctionNumber } from '../../types/types';
import { CITIES } from '../../const';
import { getActiveOffer } from '../../store/action';

const ITEMS_COUNT = 5;

type MainProps = {
  isNearPlace: boolean;
  onFavoriteClick: FunctionOffers;
  cityActive: string;
}

function Main({ isNearPlace, onFavoriteClick, cityActive }: MainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { town, accommodations, idActiveOffer } = useAppSelector((state) => state);
  const offers = accommodations.filter((offer: Offer) => offer.city.name === town);
  const handleOfferMouseOver: FunctionNumber = (offerId) => {
    dispatch(getActiveOffer(offerId));
  };
  const activePoint = CITIES.find((item) => item.name === cityActive);

  if (!activePoint) {
    return <div>No city</div>;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {offers.length} places to stay in {town}</b>
          <SortForm />
          <div className="cities__places-list places__list tabs__content">
            {offers.slice(0, ITEMS_COUNT).map((offer) => (<OfferCard offer={offer} isNearPlace={isNearPlace} onFavoriteClick={onFavoriteClick} onOfferMouseOver={handleOfferMouseOver} key={offer.id} />))}
          </div>
        </section>
        <section className="visually-hidden cities__map map">{idActiveOffer}</section>
        <div className="cities__right-section">
          <Map activePoint={activePoint} offers={offers} offerActive={idActiveOffer}  mapPlace={'main'} />
        </div>
      </div >
    </div >
  );
}
export default Main;
