import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks/';
import OfferCard from '../offer-card/offer-card';

type NearbyProps = {
  isNearPlace: boolean;
}
function Nearby({ isNearPlace }: NearbyProps): JSX.Element {
  const offersNearby = useAppSelector((state) => state[NameSpace.offers].offersNearby);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersNearby.map((offerNearby) => (
          <OfferCard
            offer={offerNearby}
            isNearPlace={isNearPlace}
            key={offerNearby.id}
          />))}
      </div>
    </section>
  );
}

export default Nearby;
