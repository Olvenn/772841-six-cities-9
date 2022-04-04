import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { CITIES, SortTypes } from '../../const';
import { filterByCityName, sortings } from '../../utils';
import { Offer } from '../../types/types';
import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import Card from '../card/card';
import { getActiveOffer } from '../../store/reducers/offers';
import { getOffers, getCity, getActiveOfferSelector } from '../../store/reducers/selectors';

type MainProps = {
  cityActive: string;
}

function Main({ cityActive }: MainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState(SortTypes.Default);

  const handleSortClick: (sort: SortTypes) => void = useCallback((sort) => {
    setSortType(sort);
  }, []);

  const activeOffer = useAppSelector(getActiveOfferSelector);
  const town = useAppSelector(getCity);
  const rawOffers = useAppSelector(getOffers);

  const increment = (value : string) => {
    const cityOffers = filterByCityName(rawOffers, value);
    return cityOffers;
  };

  const memo = (originalFn:  (value: string) => Offer[]) => {
    const result = new Map();

    return (value: string) => {
      if (!result.has(value)) {
        result.set(
          value,
          originalFn(value),
        );
      }

      return result.get(value);
    };
  };

  const memorizedIncrement = memo(increment);
  const cityOffers = memorizedIncrement(town);
  const sortedOffers = sortings[sortType](cityOffers);

  const handleOfferMouseOver: (item: Offer) => void = useCallback((offer) => {
    dispatch(getActiveOffer(offer));
  }, [dispatch]);

  const activePoint = CITIES.find((item) => item.name === cityActive);
  const isNearPlace = true;

  if (!activePoint) {
    return <div>No city</div>;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {sortedOffers.length} places to stay in {town}</b>
          <SortForm onSortClick={handleSortClick} sortType={sortType} />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) =>
              (<OfferCard offer={offer} isNearPlace={isNearPlace} onOfferMouseOver={handleOfferMouseOver} key={offer.id} />))}
          </div>
        </section>
        <section className="visually-hidden cities__map map"></section>
        <div className="cities__right-section">
          <Card activePoint={activePoint} offers={sortedOffers} offerActive={activeOffer} mapPlace={'main'} />
        </div>
      </div >
    </div >
  );
}
export default Main;
