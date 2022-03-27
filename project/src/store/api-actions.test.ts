import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, loginAction, logoutAction, fetchOffersAction, fetchCommentsAction, fetchFavoritesAction, commentAction, fetchNearbyAction } from './api-actions';
import { requireAuthorization } from './reducers/user';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import { makeFakeOffers, makeFakeComments } from '../mocks';
import { loadOffers, loadOffersNearby, changeOffers } from './reducers/offers';
import { setComments } from './reducers/comments';
import { loadFavorites, changeFavorite } from './reducers/favorites';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { Offer } from '../types/types';

const ALLOFFERS = 25;
const NEARBY = 3;
const COMMENTS = 4;
const FAVORITES = 7;

const fakeOffers = makeFakeOffers(ALLOFFERS);
const fakeComments = makeFakeComments(COMMENTS);
const fakeFavorites = makeFakeOffers(FAVORITES);
const fakeNearbyOffers = makeFakeOffers(NEARBY);


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  jest.useFakeTimers();

  it('should call callback', async () => {
    jest.useFakeTimers();
    const mockCallback = jest.fn();
    setTimeout(mockCallback);
    jest.advanceTimersByTime(TIMEOUT_SHOW_ERROR);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch loadOffers when GET /Offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch loadOffers when GET /Comments', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeComments[1].id}`)
      .reply(200, fakeComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(fakeComments[1].id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setComments.toString());
  });

  it('should dispatch loadFavorites when GET /Favorites', async () => {
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, fakeFavorites);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch loadOffersNearby when GET /NearbyOffers by id', async () => {
    const id = 1;
    mockAPI
      .onGet(`${APIRoute.Offers}/${id}${APIRoute.OffersNearby}`)
      .reply(200, fakeNearbyOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyAction(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(loadOffersNearby.toString());
  });

  it('should dispatch change status Favorites when POST Favorite offer', async () => {
    const fakeFavorite: Offer = fakeFavorites[0];

    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeComments[1].id}`)
      .reply(200, fakeFavorite);
    const store = mockStore();
    store.dispatch(changeFavorite(fakeFavorite));
    store.dispatch(changeOffers(fakeFavorite));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(changeFavorite.toString());
    expect(actions).toContain(changeOffers.toString());
  });

  it('should dispatch setComments when add Comment when POST', async () => {
    const fakeComment: CommentData = { offerId: fakeComments[1].id, rating: 2, comment: 'Some comment text' };

    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeComments[1].id}`)
      .reply(200, fakeComments);
    const store = mockStore();
    await store.dispatch(commentAction(fakeComment));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(setComments.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    await store.dispatch(loginAction(fakeUser));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(requireAuthorization.toString());
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toContain(requireAuthorization.toString());
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
