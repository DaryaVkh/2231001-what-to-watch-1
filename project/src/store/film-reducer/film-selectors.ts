import { NameSpace } from '../../common/enums';
import { Film } from '../../types/film.type';
import { Review } from '../../types/review.type';
import { State } from '../../types/state.type';

export const getFilm = (state: State): Film | null => state[NameSpace.Film].film;
export const getFilmReviews = (state: State): Review[] => state[NameSpace.Film].reviews;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.Film].similarFilms;
