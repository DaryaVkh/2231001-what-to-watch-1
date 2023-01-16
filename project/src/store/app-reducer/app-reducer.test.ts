import { Genre } from '../../types/genre.enum';
import { AppState } from '../../types/state.type';
import { makeFakeFilm } from '../../utils/mocks';
import { setActiveGenreAction, setFilmsAction, setIsLoadingAction, setPromoFilmAction } from '../actions';
import { appReducer } from './app-reducer';

const fakeFilm = makeFakeFilm();

describe('Reducer: appReducer', () => {
  let state: AppState;

  beforeEach(() => {
    state = {
      genre: Genre.AllGenres,
      films: [],
      isLoading: false,
      promoFilm: null
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(appReducer.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('Should update films field on setFilmsAction', () => {
    expect(appReducer.reducer(state, { type: setFilmsAction, payload: [fakeFilm] }))
      .toEqual({
        ...state,
        films: [fakeFilm]
      });
  });

  it('Should update genre field on setActiveGenreAction', () => {
    expect(appReducer.reducer(state, { type: setActiveGenreAction, payload: { newGenre: Genre.Crime } }))
      .toEqual({
        ...state,
        genre: Genre.Crime
      });
  });

  it('Should update isLoading field on setIsLoadingAction', () => {
    expect(appReducer.reducer(state, { type: setIsLoadingAction, payload: true }))
      .toEqual({
        ...state,
        isLoading: true
      });
  });

  it('Should update promoField field on setPromoFilmAction', () => {
    expect(appReducer.reducer(state, { type: setPromoFilmAction, payload: fakeFilm }))
      .toEqual({
        ...state,
        promoFilm: fakeFilm
      });
  });
});
