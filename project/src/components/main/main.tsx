import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import Map from '../map/map';
import { Offer, FunctionNumber } from '../../types/types';
import { useState } from 'react';
import { CITIES } from '../../const';

const ITEMS_COUNT = 5;

type MainProps = {
  offerCount: number;
  isNearPlace: boolean;
  offers: Offer[];
  activeOffer: number;
  favoritesId: number[];
  onFavoriteClick: FunctionNumber;
  cityActive: string;
}

function Main({ offerCount, isNearPlace, offers, activeOffer, favoritesId, onFavoriteClick, cityActive }: MainProps): JSX.Element {
  const [offerActive, setActiveOffer] = useState(activeOffer);
  const handleOfferMouseOver: FunctionNumber = (offerId) => {
    setActiveOffer(offerId);
  };
  const cityOne = CITIES.find((item) => item.name === cityActive);
  if (!cityOne) {
    return <div>No city</div>;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {offerCount} places to stay in Amsterdam</b>
          <SortForm />
          <div className="cities__places-list places__list tabs__content">
            {offers.slice(0, ITEMS_COUNT).map((offer) => (<OfferCard offer={offer} isNearPlace={isNearPlace} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} onOfferMouseOver={handleOfferMouseOver} key={offer.id} />))}
          </div>
        </section>
        <section className="visually-hidden cities__map map">{offerActive}</section>
        <div className="cities__right-section">
          <Map city={cityOne} offers={offers} offerActive={offerActive} />
        </div>
      </div >
    </div >
  );
}
export default Main;
