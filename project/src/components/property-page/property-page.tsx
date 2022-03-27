import PageHeader from '../page-header/page-header';
import CommentForm from '../comment-form/comment-form';
import Comments from '../comments/comments';
import Nearby from '../nearby/nearby';
import { firstToUpperCase } from '../../utils';
import { useParams } from 'react-router-dom';
import Map from '../map/map';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { changeFavoriteAction } from '../../store/api-actions';
import { fetchNearbyAction, fetchCommentsAction } from '../../store/api-actions';
import { AuthorizationStatus, NameSpace } from '../../const';

const IMAGES_COUNT = 6;

function PropertyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state[NameSpace.offers].offers);
  const authorizationStatus = useAppSelector((state) => state[NameSpace.user].authorizationStatus);

  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Id not found</div>;
  }

  const offer = offers.find((item) => item.id === +id?.slice(1));
  if (!offer) {
    return <div>Not found offer</div>;
  }

  dispatch(fetchNearbyAction(offer.id));
  dispatch(fetchCommentsAction(offer.id));

  const handleFavoriteClick = () => {
    dispatch(changeFavoriteAction(offer));
  };

  const images = offer.images;

  return (
    <div className="page">
      {<PageHeader />}
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, IMAGES_COUNT).map((image: string) => <div className="property__image-wrapper" key={Math.random()}><img className="property__image" src={image} alt="Photograph studio" /></div>)}
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
                <button onClick={handleFavoriteClick} className={`property__bookmark-button button  ${offer.isFavorite && 'property__bookmark-button--active'} `} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
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
                <Comments />
                {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm offerId={offer.id} /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map activePoint={offer.city} offers={[]} offerActive={offer} mapPlace={'property'} />
          </section>
        </section>
        <div className="container">
          <Nearby />
        </div>
      </main>
    </div >
  );
}
export default PropertyPage;
