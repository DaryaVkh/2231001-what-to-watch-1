import { createReducer } from '@reduxjs/toolkit';
import { FILM_LIST } from '../mocks/films';
import { Genre } from '../types/genre.enum';
import { changeActiveGenre, setFilmList } from './action';

const initialState = {
  activeGenre: Genre.ALL_GENRES,
  filmList: FILM_LIST
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      const { newGenre } = action.payload;

      state.activeGenre = newGenre;
    })
    .addCase(setFilmList, (state, action) => {
      const { filmList } = action.payload;

      state.filmList = filmList;
    });
});

export { reducer };
