import { Offer } from './types/types';

export const shuffle = (items: string[]) => items.sort(() => Math.random() - 0.5);

export const firstToUpperCase = (str: string) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const sortPriceLowToHigh = (offerA: Offer, offerB: Offer) => (offerA.price - offerB.price);
export const sortPriceHighToLow = (offerA: Offer, offerB: Offer) => (offerB.price - offerA.price);
export const sortRating = (offerA: Offer, offerB: Offer) => (offerB.rating - offerA.rating);

export const filterByCityName = (offers: Offer[], cityName: string) => offers.filter((offer: Offer) => offer.city.name === cityName);
