import { Link } from 'react-router-dom';
import { Offer, FunctionNumber } from '../../types/types';
import { firstToUpperCase } from '../../utils';

type OfferCardProps = {
  oneFavoriteOffer: Offer;
  favoritesId: number[];
  handelFavoritesClick: FunctionNumber;
}

function favoriteCard({ oneFavoriteOffer, favoritesId, handelFavoritesClick }: OfferCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type } = oneFavoriteOffer;
  const isFavoriteStatus = favoritesId.includes(id) ? 1 : 0;

  return (
    <article className="favorites__card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/:${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place images" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={() => handelFavoritesClick(id)} className={`place-card__bookmark-button button  ${isFavoriteStatus && 'place-card__bookmark-button--active'} `} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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
    </article>
  );
}
export default favoriteCard;
