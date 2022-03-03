import { Link } from 'react-router-dom';
import { firstToUpperCase } from '../../utils';
import { Offer, FunctionNumber } from '../../types/types';

type OfferCardProps = {
  offer: Offer;
  isNearPlace: boolean;
  favoritesId: number[];
  onFavoriteClick: FunctionNumber;
  onOfferMouseOver: FunctionNumber;
}

function OfferCard({ offer, isNearPlace, favoritesId, onFavoriteClick, onOfferMouseOver }: OfferCardProps): JSX.Element {
  const handleMouseOver = () => {
    onOfferMouseOver(offer.id);
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={handleMouseOver}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${!isNearPlace ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/offer/:${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place images" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => onFavoriteClick(offer.id)} className={`place-card__bookmark-button button  ${favoritesId.includes(offer.id) && 'place-card__bookmark-button--active'} `} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/:${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{firstToUpperCase(offer.type)}</p>
      </div>
    </article>
  );
}
export default OfferCard;
