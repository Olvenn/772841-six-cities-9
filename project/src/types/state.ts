import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const.js';
import { Offer, Comment } from '../types/types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  email: string,
};

export type OffersProcess = {
  town: string,
  offers: Offer[],
  isLoading: boolean,
  activeOffer?: Offer,
  changedOffer?: Offer,
  offersNearby: Offer[],
};

export type Interaction = {
  favorites: Offer[],
  comments: Comment[],
  isLoading: boolean,
};


