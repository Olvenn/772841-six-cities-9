import { Link } from 'react-router-dom';
import { firstToUpperCase } from '../../utils';
import { Offer } from '../../types/types';


type OfferCardProps = {
  oneOffer: Offer;
  isNearPlace: boolean;
}

function OfferCard({ oneOffer, isNearPlace }: OfferCardProps): JSX.Element {

  const { id, isPremium, previewImage, price, rating, title, type } = oneOffer;

  return (
    <>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${!isNearPlace ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/offer/:${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place images" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/:${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{firstToUpperCase(type)}</p>
      </div>
    </>
  );
}

export default OfferCard;


