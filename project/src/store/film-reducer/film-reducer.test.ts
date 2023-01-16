import { FilmState } from '../../types/state.type';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import { setFilmAction, setFilmReviewsAction, setSimilarFilmsAction } from '../actions';
import { filmReducer } from './film-reducer';

const fakeFilm = makeFakeFilm();
const fakeReview = makeFakeReview();

describe('Reducer: filmReducer', () => {
  let state: FilmState;

  beforeEach(() => {
    state = {
      film: null,
      reviews: [],
      similarFilms: []
    };
  });

  it('Without additional parameters should return initial state', () => {
    expect(filmReducer.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('Should update film field on setFilmAction', () => {
    expect(filmReducer.reducer(state, { type: setFilmAction, payload: fakeFilm }))
      .toEqual({
        ...state,
        film: fakeFilm
      });
  });

  it('Should update reviews field on setFilmReviewsAction', () => {
    expect(filmReducer.reducer(state, { type: setFilmReviewsAction, payload: [fakeReview] }))
      .toEqual({
        ...state,
        reviews: [fakeReview]
      });
  });

  it('Should update similarFilms field on setSimilarFilmsAction', () => {
    expect(filmReducer.reducer(state, { type: setSimilarFilmsAction, payload: [fakeFilm] }))
      .toEqual({
        ...state,
        similarFilms: [fakeFilm]
      });
  });
});
