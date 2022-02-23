import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import { Offer, functionNumber } from '../../types/types';
import { useState } from 'react';

const ITEMS_COUNT = 5;

type MainNotEmptyProps = {
  offerCount: number;
  isNearPlace: boolean;
  offersAll: Offer[];
  activeOffer: number;
}

function MainNotEmpty({ offerCount, isNearPlace, offersAll, activeOffer }: MainNotEmptyProps): JSX.Element {

  const [offerActive, setActiveOffer] = useState(activeOffer);

  const mouseOverActiveOfferHandler: functionNumber = (id) => {
    setActiveOffer(id);
    // eslint-disable-next-line no-console
    console.log(offerActive);

  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {offerCount} places to stay in Amsterdam</b>
          <SortForm />

          <div className="cities__places-list places__list tabs__content">
            {offersAll.slice(0, ITEMS_COUNT).map((offer) => <article className="cities__place-card place-card" onMouseOver={() => mouseOverActiveOfferHandler(offer.id)} key={Math.random()}><OfferCard oneOffer={offer} isNearPlace={isNearPlace} /></article>)}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  );
}


export default MainNotEmpty;
