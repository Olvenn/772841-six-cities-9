import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import { Offer, FunctionNumber } from '../../types/types';
import { useState } from 'react';

const ITEMS_COUNT = 5;

type MainNotEmptyProps = {
  offerCount: number;
  isNearPlace: boolean;
  offers: Offer[];
  activeOffer: number;
  favoritesId: number[];
  onFavoriteClick: FunctionNumber;
}

function MainNotEmpty({ offerCount, isNearPlace, offers, activeOffer, favoritesId, onFavoriteClick }: MainNotEmptyProps): JSX.Element {
  const [offerActive, setActiveOffer] = useState(activeOffer);
  const mouseOverActiveOfferHandler: FunctionNumber = (id) => {
    setActiveOffer(id);
  };

  //Не получилось заменить
  // const handleMouseOver = () => (idOffer: number) => mouseOverActiveOfferHandler(idOffer);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {offerCount} places to stay in Amsterdam</b>
          <SortForm />
          <div className="cities__places-list places__list tabs__content">
            {offers.slice(0, ITEMS_COUNT).map((offer) => <article className="cities__place-card place-card" onMouseOver={() => mouseOverActiveOfferHandler(offer.id)} key={Math.random()}><OfferCard offer={offer} isNearPlace={isNearPlace} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} /></article>)}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">{offerActive}</section>
        </div>
      </div>
    </div>
  );
}
export default MainNotEmpty;
