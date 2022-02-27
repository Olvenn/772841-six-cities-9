import PageHeader from '../../page-header/page-header';
import PageHeaderNoLogged from '../../page-header-no-logged/page-header-no-logged';
import CommentCard from '../../comment-card/comment-card';
import { comments } from '../../../mock/mock';
import CommentForm from '../../comment-form/comment-form';
import { AuthorizationStatus } from '../../../const';
import { shuffle, firstToUpperCase } from '../../../utils';
import OfferCard from '../../offer-card/offer-card';
import { useParams } from 'react-router-dom';
import { Offer, FunctionNumber } from '../../../types/types';

const IMAGES_COUNT = 6;
const NEAR_COUNT = 3;

type PageHeaderProps = {
  userName: string;
  isNearPlace: boolean;
  offers: Offer[];
  favoritesId: number[];
  onFavoriteClick: FunctionNumber;
}

function PropertyPage({ userName, isNearPlace, offers, favoritesId, onFavoriteClick }: PageHeaderProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((item) => String(item.id) === id?.slice(1));
  if (!offer) {
    return <div>Not found</div>;
  }

  return (
    <div className="page">
      {AuthorizationStatus.Auth === 'AUTH' ? <PageHeader userName={userName} /> : <PageHeaderNoLogged />}
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {shuffle(offer.images).slice(0, IMAGES_COUNT).map((image) => <div className="property__image-wrapper" key={Math.random()}><img className="property__image" src={image} alt="Photograph studio" /></div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {firstToUpperCase(offer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} {offer.bedrooms === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods?.map((good) => <li className="property__inside-item" key={good}>{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={`../${offer.host.avatarUrl}`} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  {comments.map((review) => <li className="reviews__item" key={review.id}><CommentCard feedback={review} /></li>)}
                </ul>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offers.slice(0, NEAR_COUNT).map((item) => <article className="cities__place-card place-card" key={Math.random()}><OfferCard offer={item} isNearPlace={!isNearPlace} favoritesId={favoritesId} onFavoriteClick={onFavoriteClick} /></article>)}
            </div>
          </section>
        </div>
      </main>
    </div >
  );
}
export default PropertyPage;
