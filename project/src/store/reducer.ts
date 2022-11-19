import { createReducer } from '@reduxjs/toolkit';
import { FILM_LIST } from '../mocks/films';
import { Genre } from '../types/genre.enum';
import { changeActiveGenre, incVisibleFilmsCount, resetVisibleFilmsCount, setFilmList } from './action';

const VISIBLE_FILMS_COUNT_STEP = 8;

const initialState = {
  activeGenre: Genre.ALL_GENRES,
  filmList: FILM_LIST,
  visibleFilmsCount: VISIBLE_FILMS_COUNT_STEP
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
    })
    .addCase(incVisibleFilmsCount, (state) => {
      state.visibleFilmsCount += VISIBLE_FILMS_COUNT_STEP;
    })
    .addCase(resetVisibleFilmsCount, (state) => {
      state.visibleFilmsCount = VISIBLE_FILMS_COUNT_STEP;
    });
});

export { reducer };
