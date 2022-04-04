import { NameSpace, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { Comment, Offer } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Offers].offersNearby;
export const getCity = (state: State): string => state[NameSpace.Offers].town;
export const getIsLoadingOffers = (state: State): boolean => state[NameSpace.Offers].isLoading;
export const getActiveOfferSelector = (state: State): Offer | undefined => state[NameSpace.Offers].activeOffer;
export const getChangedOffer = (state: State): Offer | undefined => state[NameSpace.Offers].changedOffer;

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getIsLoadingComments = (state: State): boolean => state[NameSpace.Comments].isLoading;
export const getSuccessfully = (state: State): number => state[NameSpace.Comments].isSuccessfully;

export const getFavorites = (state: State): Offer[] => state[NameSpace.Favorites].favorites;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string => state[NameSpace.User].email;

export const getError = (state: State): string => state[NameSpace.Main].error;
