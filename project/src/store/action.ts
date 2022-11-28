import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../types/genre.enum';

export const changeActiveGenre = createAction<{ newGenre: Genre }>('changeActiveGenre');
