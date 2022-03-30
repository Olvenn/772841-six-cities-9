import { SortTypes } from './const';
import { Offer, Comment } from './types/types';
import { setError } from './store/action';
import { clearErrorAction } from './store/api-actions';
import { store } from './store';

export const dispatchError = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

export const shuffle = (items: string[]) => items.sort(() => Math.random() - 0.5);

export const firstToUpperCase = (str: string) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const sortByPriceAsc = (a: Offer, b: Offer) => (a.price - b.price);
export const sortByPriceDesc = (a: Offer, b: Offer) => (b.price - a.price);
export const sortByRating = (a: Offer, b: Offer) => (b.rating - a.rating);

export const sortings = {
  [SortTypes.PriceHighToLow]: (offers: Offer[]) => offers.sort(sortByPriceAsc),
  [SortTypes.PriceLowToHigh]: (offers: Offer[]) => offers.sort(sortByPriceDesc),
  [SortTypes.Rating]: (offers: Offer[]) => offers.sort(sortByRating),
  [SortTypes.Default]: (offers: Offer[]) => offers,
};

export const filterByCityName = (offers: Offer[], cityName: string) => [...offers].filter((offer: Offer) => offer.city.name === cityName);

export const sortByDayAsc = (a: Comment, b: Comment) => ((Date.parse(b.date)) - (Date.parse(a.date)));
