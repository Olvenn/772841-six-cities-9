import { City } from './types/types';

export const ACTIVE_TOWN = 'Paris';
export const ZOOM = 12;
export const MAX_COMMENTS = 10;
export const MAX_LENGTH = 300;
export const MIN_LENGTH = 50;

export enum SortTypes {
  Default = 'Popular',
  PriceLowToHigh = 'PriceLowToHigh',
  PriceHighToLow = 'PriceHighToLow',
  Rating = 'Rating',
}

export const cities: { [index: string]: string } = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

export const URL_MARKER_ACTIVE = '/img/pin-active.svg';
export const URL_MARKER = '/img/pin.svg';

export const CITIES: City[] = [
  {
    location: {
      latitude: 48.8534100,
      longitude: 2.3488000,
      zoom: ZOOM,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.9333300,
      longitude: 6.9500000,
      zoom: ZOOM,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
      zoom: ZOOM,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: ZOOM,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
      zoom: ZOOM,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
      zoom: ZOOM,
    },
    name: 'Dusseldorf',
  },
];

export const ratings: { id: string, name: string }[] = [
  { 'id': '5-stars', 'name': 'perfect' },
  { 'id': '4-stars', 'name': 'good' },
  { 'id': '3-stars', 'name': 'not bad' },
  { 'id': '2-stars', 'name': 'badly' },
  { 'id': '1-stars', 'name': 'erribly' },
];

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Property = '/offer/:id',
  Favorites = '/favorites',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Offer = '/hotels/',
  Offers = '/hotels',
  OffersNearby = '/nearby',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum NameSpace {
  Offers = 'OFFERS',
  Favorites = 'FAVORITES',
  Comments = 'COMMENTS',
  User = 'USER',
  Main = 'MAIN',
}
