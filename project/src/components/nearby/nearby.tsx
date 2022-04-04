import {getOffersNearby} from '../../store/reducers/selectors';
import { useAppSelector } from '../../hooks/';
import OfferCard from '../offer-card/offer-card';

function Nearby(): JSX.Element {
  const offersNearby = useAppSelector(getOffersNearby);
  const isNearPlace = false;
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersNearby.map((offerNearby) => (<OfferCard offer={offerNearby} isNearPlace={isNearPlace} key={offerNearby.id} />))}
      </div>
    </section>
  );
}

export default Nearby;
