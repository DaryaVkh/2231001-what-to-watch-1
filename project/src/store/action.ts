import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../common/models';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';

export const changeActiveGenre = createAction<{ newGenre: Genre }>('changeActiveGenre');

export const loadFilms = createAction<Film[]>('loadFilms');

export const setLoading = createAction<boolean>('setLoading');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
