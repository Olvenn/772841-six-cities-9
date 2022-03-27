import { favorites, loadFavorites, changeFavorite } from './favorites';
import { makeFakeOffers } from '../../mocks';
import { datatype } from 'faker';

const FAVORITES = 5;
const fakeFavorites = makeFakeOffers(FAVORITES).map((fakeFavorite) => fakeFavorite.isFavorite ? fakeFavorite : { ...fakeFavorite, isFavorite: true });
const getFakeOffer = () => fakeFavorites[(datatype.number({ min: 1, max: fakeFavorites.length }))];

describe('Reducer: FAVORITES', () => {
  it('without additional parameters should return initial state', () => {
    expect(favorites.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        favorites: [],
      });
  });
});

it('should update offers by load favorites offers', () => {
  const state = {
    favorites: [],
  };
  expect(favorites.reducer(state, loadFavorites(fakeFavorites)))
    .toEqual({
      favorites: fakeFavorites,

    });
});

it('should update offers when delete one favoriteOffer', () => {
  const changedFavorites = fakeFavorites;
  const fakeOffer = getFakeOffer();
  const offer = { ...fakeOffer, isFavorite: false };

  const state = {
    favorites: changedFavorites,
  };
  const newFavorites = changedFavorites.filter((item) => item.id !== offer.id);

  expect(favorites.reducer(state, changeFavorite(offer)))
    .toEqual({
      favorites: newFavorites,
    });
});

it('should update offers when add one favoriteOffer', () => {
  const changedFavorites = fakeFavorites;
  const fakeOffer = makeFakeOffers(1)[0];
  const changedFavorite = { ...fakeOffer, isFavorite: true };

  const state = {
    favorites: changedFavorites,
    comments: [],
    isLoading: true,
  };
  const newFavorites = [changedFavorite, ...changedFavorites];

  expect(favorites.reducer(state, changeFavorite(changedFavorite)))
    .toEqual({
      favorites: newFavorites,
      comments: [],
      isLoading: true,
    });
});
