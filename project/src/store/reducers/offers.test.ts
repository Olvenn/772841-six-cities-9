import { offers, loadOffers, changeCity, getActiveOffer, loadOffersNearby, logoutOffers, changeOffers } from './offers';
import { makeFakeOffers, fakeCities } from '../../mocks';
import { ACTIVE_TOWN } from '../../const';
import { datatype } from 'faker';

const ALLOFFERS = 25;
const NEARBY = 3;

const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeOffersNearby = makeFakeOffers(NEARBY);

const getFakeTownName = (cities: string[]) => cities[(datatype.number({ min: 1, max: cities.length }))];
const getFakeOffer = () => fakeOffers[(datatype.number({ min: 1, max: fakeOffers.length }))];

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    expect(offers.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        town: ACTIVE_TOWN,
        offers: [],
        isLoading: false,
        activeOffer: undefined,
        changedOffer: undefined,
        offersNearby: [],
      });
  });

  it('should update offers by load offers', () => {
    const state = {
      town: ACTIVE_TOWN,
      offers: [],
      isLoading: false,
      activeOffer: undefined,
      changedOffer: undefined,
      offersNearby: [],
    };
    expect(offers.reducer(state, loadOffers(fakeOffers)))
      .toEqual({
        town: ACTIVE_TOWN,
        offers: fakeOffers,
        isLoading: true,
        activeOffer: undefined,
        changedOffer: undefined,
        offersNearby: [],
      });
  });

  it('should update offers when change one offer', () => {
    const town = getFakeTownName(fakeCities);
    const changedOffer = fakeOffers[0];

    const state = {
      town: town,
      offers: fakeOffers,
      isLoading: true,
      activeOffer: undefined,
      changedOffer: changedOffer,
      offersNearby: [],
    };
    const changerdOffers = fakeOffers.map((offer) => offer.id !== changedOffer.id ? offer : { ...offer, isFavorite: !offer.isFavorite });

    expect(offers.reducer(state, changeOffers(changedOffer)))
      .toEqual({
        town: town,
        offers: changerdOffers,
        isLoading: true,
        activeOffer: undefined,
        changedOffer: changedOffer,
        offersNearby: [],
      });
  });

  it('should update town', () => {
    const state = {
      town: ACTIVE_TOWN,
      offers: fakeOffers,
      isLoading: true,
      activeOffer: undefined,
      changedOffer: undefined,
      offersNearby: [],
    };
    const newTown = getFakeTownName(fakeCities);
    expect(offers.reducer(state, changeCity(newTown)))
      .toEqual({
        town: newTown,
        offers: fakeOffers,
        isLoading: true,
        activeOffer: undefined,
        changedOffer: undefined,
        offersNearby: [],
      });
  });

  it('should update active offer, when onMouseOffer', () => {
    const town = getFakeTownName(fakeCities);
    const state = {
      town: town,
      offers: fakeOffers,
      isLoading: true,
      activeOffer: undefined,
      changedOffer: undefined,
      offersNearby: [],
    };
    const fakeActiveOffer = getFakeOffer();
    expect(offers.reducer(state, getActiveOffer(fakeActiveOffer)))
      .toEqual({
        town: town,
        offers: fakeOffers,
        isLoading: true,
        activeOffer: fakeActiveOffer,
        changedOffer: undefined,
        offersNearby: [],
      });
  });

  it('should update OffersNearby by load OffersNearby', () => {
    const town = getFakeTownName(fakeCities);
    const fakeActiveOffer = getFakeOffer();
    const state = {
      town: town,
      offers: fakeOffers,
      isLoading: true,
      activeOffer: fakeActiveOffer,
      changedOffer: undefined,
      offersNearby: [],
    };
    const OffersNearby = fakeOffersNearby;
    expect(offers.reducer(state, loadOffersNearby(fakeOffersNearby)))
      .toEqual({
        town: town,
        offers: fakeOffers,
        isLoading: true,
        activeOffer: fakeActiveOffer,
        changedOffer: undefined,
        offersNearby: OffersNearby,
      });
  });

  it('should have lotout user', () => {
    const state = {
      town: getFakeTownName(fakeCities),
      offers: fakeOffers,
      isLoading: true,
      activeOffer: undefined,
      changedOffer: undefined,
      offersNearby: [],
    };
    expect(offers.reducer(state, logoutOffers()))
      .toEqual({
        town: ACTIVE_TOWN,
        offers: fakeOffers,
        isLoading: true,
        activeOffer: undefined,
        changedOffer: undefined,
        offersNearby: [],
      });
  });
});
