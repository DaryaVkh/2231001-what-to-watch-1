import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';

export const changeActiveGenre = createAction<{ newGenre: Genre }>('changeActiveGenre');
export const setFilmList = createAction<{ filmList: Film[] }>('setFilmList');
