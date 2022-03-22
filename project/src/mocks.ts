import { address, commerce, company, database, datatype, image, internet, random, lorem } from 'faker';
import { ZOOM, cities } from './const';
import { AuthData, Location, PersonData, City, Offer, Comment } from './types/types';

const NUMBER_OF_ROOMS = 7;
const NUMBER_OF_GOODS = 9;
const NUMBER_OF_IMAGES = 14;
const RATING = 5;
export const MIN_ID = 100;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;

export const makeFakeUser = (): PersonData => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
} as PersonData);

export const makeFakeAuthInfo = (): AuthData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.string(),
} as AuthData);

export const makeFakeLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: ZOOM,
} as Location);

export const fakeCities = Object.values(cities);

export const makeFakeCity = (): City => ({
  name: fakeCities[(datatype.number({ min: 1, max: fakeCities.length }))],
  location: makeFakeLocation(),
} as City);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(NUMBER_OF_ROOMS),
  city: makeFakeCity(),
  description: commerce.productDescription(),
  goods: Array.from({ length: NUMBER_OF_GOODS }, () => random.word()),
  host: makeFakeUser(),
  id: datatype.number({ min: MIN_ID }),
  images: Array.from({ length: NUMBER_OF_IMAGES }, () => image.image()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number(NUMBER_OF_ROOMS),
  previewImage: image.image(),
  price: datatype.number({ min: MIN_PRICE, max: MAX_PRICE }),
  rating: datatype.number({ min: 0, max: RATING }),
  title: company.catchPhrase(),
  type: database.type(),
} as Offer);

export const makeFakeComment = (): Comment => ({
  comment: lorem.sentence(300, 50),
  date: datatype.datetime.toString(),
  id: datatype.number(100000),
  rating: datatype.number({ min: 0, max: RATING }),
  user: makeFakeUser(),
} as Comment);

export const makeFakeOffers = (quantity: number): Offer[] => (
  new Array(quantity).fill(null).map(makeFakeOffer) as Offer[]);

export const makeFakeComments = (quantity: number): Comment[] => (
  new Array(quantity).fill(null).map(makeFakeComment) as Comment[]);
