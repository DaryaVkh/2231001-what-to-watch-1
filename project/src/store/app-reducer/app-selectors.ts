import { NameSpace } from '../../common/enums';
import { Film } from '../../types/film.type';
import { State } from '../../types/state.type';

export const getFilms = (state: State): Film[] => state[NameSpace.App].films;
export const getGenre = (state: State): string => state[NameSpace.App].genre;
export const getIsLoading = (state: State): boolean => state[NameSpace.App].isLoading;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.App].promoFilm;
