import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../common/models';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';
import { User } from '../types/user.type';

export const changeActiveGenre = createAction<{ newGenre: Genre }>('changeActiveGenre');

export const loadFilms = createAction<Film[]>('loadFilms');

export const setLoading = createAction<boolean>('setLoading');

export const changeAuthStatus = createAction<AuthorizationStatus>('changeAuthStatus');

export const setUserInfo = createAction<User | null>('setUserInfo');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
