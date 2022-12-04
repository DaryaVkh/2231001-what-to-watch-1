import { createReducer } from '@reduxjs/toolkit';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';
import { changeActiveGenre, loadFilms, setLoading } from './action';

type InitialState = {
  genre: Genre;
  films: Film[];
  isLoading: boolean;
};

const initialState: InitialState = {
  genre: Genre.ALL_GENRES,
  films: [],
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      const { newGenre } = action.payload;

      state.genre = newGenre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});

export { reducer };
