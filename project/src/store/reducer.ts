import { createReducer } from '@reduxjs/toolkit';
import { FILM_LIST } from '../mocks/films';
import { Genre } from '../types/genre.enum';
import { changeActiveGenre } from './action';

const initialState = {
  genre: Genre.ALL_GENRES,
  films: FILM_LIST
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      const { newGenre } = action.payload;

      state.genre = newGenre;
    });
});

export { reducer };
