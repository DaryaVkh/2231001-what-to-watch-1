import { AuthorizationStatus } from '../../common/enums';
import { UserState } from '../../types/state.type';
import { makeFakeFilm, makeFakeUser } from '../../utils/mocks';
import { setAuthorizationStatusAction, setFavoriteFilmsAction, setUserAction } from '../actions';
import { userReducer } from './user-reducer';

const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm();

describe('Reducer: userReducer', () => {
  let state: UserState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      favoriteFilms: []
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(userReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should update user field on setUserAction', () => {
    expect(userReducer.reducer(state, { type: setUserAction, payload: fakeUser }))
      .toEqual({
        ...state,
        user: fakeUser
      });
  });

  it('Should update authorizationStatus field on setAuthorizationStatusAction', () => {
    expect(userReducer.reducer(state, { type: setAuthorizationStatusAction, payload: AuthorizationStatus.Auth }))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.Auth
      });
  });

  it('Should update favoriteFilms field on setFavoriteFilmsAction', () => {
    expect(userReducer.reducer(state, { type: setFavoriteFilmsAction, payload: [fakeFilm] }))
      .toEqual({
        ...state,
        favoriteFilms: [fakeFilm]
      });
  });
});
