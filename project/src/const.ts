import { StringArray } from './types/types';

export enum SortOptions {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  Rated = 'Top rated first',
}

export const citiesList: StringArray = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

export const rating: { id: string, name: string }[] = [
  { 'id': '5-stars', 'name': 'perfect' },
  { 'id': '4-stars', 'name': 'good' },
  { 'id': '3-stars', 'name': 'not bad' },
  { 'id': '2-stars', 'name': 'badly' },
  { 'id': '1-stars', 'name': 'erribly' },
];

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer/:id',
  Favorites = '/favorites',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

