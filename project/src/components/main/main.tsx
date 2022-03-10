import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { CITIES } from '../../const';
import { sortPriceLowToHigh, sortPriceHighToLow, sortRating, filterByCityName } from '../../utils';
import { Offer, FunctionNumber, FunctionString } from '../../types/types';
import OfferCard from '../offer-card/offer-card';
import SortForm from '../sort-form/sort-form';
import Map from '../map/map';
import { getActiveOffer } from '../../store/action';

const ITEMS_COUNT = 5;

type MainProps = {
  isNearPlace: boolean;
  cityActive: string;
}

function Main({ isNearPlace, cityActive }: MainProps): JSX.Element {
  const [sortType, setSortType] = useState('Popular');
  const handleSortClick: FunctionString = (sort) => {
    setSortType(sort);
  };
  const dispatch = useAppDispatch();
  const { town, offers, idActiveOffer } = useAppSelector((state) => state.main);
  const getOffers = (accomadations: Offer[]): Offer[] => {
    const offersInOneCity = filterByCityName(accomadations, town);
    switch (sortType) {
      case 'PriceToHigh':
        return offersInOneCity.sort(sortPriceLowToHigh);
      case 'PriceToLow':
        return offersInOneCity.sort(sortPriceHighToLow);
      case 'Rated':
        return offersInOneCity.sort(sortRating);
    }
    return offersInOneCity;
  };
  const handleOfferMouseOver: FunctionNumber = (offerId) => {
    dispatch(getActiveOffer(offerId));
  };
  const activePoint = CITIES.find((item) => item.name === cityActive);
  const sortedOffers = getOffers(offers);

  if (!activePoint) {
    return <div>No city</div>;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found"> {sortedOffers.length} places to stay in {town}</b>
          <SortForm onSortClick={handleSortClick} />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.slice(0, ITEMS_COUNT).map((offer) =>
              (<OfferCard offer={offer} isNearPlace={isNearPlace} onOfferMouseOver={handleOfferMouseOver} key={offer.id} />))}
          </div>
        </section>
        <section className="visually-hidden cities__map map">{idActiveOffer}</section>
        <div className="cities__right-section">
          <Map activePoint={activePoint} offers={sortedOffers} offerActive={idActiveOffer} mapPlace={'main'} />
        </div>
      </div >
    </div >
  );
}
export default Main;
