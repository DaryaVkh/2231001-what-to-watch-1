import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../common/enums';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';
import { Review } from '../types/review.type';
import { User } from '../types/user.type';

export const setActiveGenreAction = createAction<{ newGenre: Genre }>('app/setActiveGenre');

export const setFilmsAction = createAction<Film[]>('app/setFilms');

export const setIsLoadingAction = createAction<boolean>('app/setIsLoading');

export const setPromoFilmAction = createAction<Film>('app/setPromoFilm');

export const setUserAction = createAction<User | null>('user/setUser');

export const setAuthorizationStatusAction = createAction<AuthorizationStatus>('user/setAuthorizationStatus');

export const setFavoriteFilmsAction = createAction<Film[]>('user/setFavoriteFilms');

export const setFilmAction = createAction<Film | null>('film/setFilm');

export const setSimilarFilmsAction = createAction<Film[]>('film/setSimilarFilms');

export const setFilmReviewsAction = createAction<Review[]>('film/setFilmReviews');
