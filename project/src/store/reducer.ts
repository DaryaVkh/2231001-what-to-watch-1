import { createReducer } from '@reduxjs/toolkit';
import { Genre } from '../types/genre.enum';
import { changeActiveGenre } from './action';

const initialState = {
  genre: Genre.ALL_GENRES
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveGenre, (state, action) => {
      const { newGenre } = action.payload;

      state.genre = newGenre;
    });
});

export { reducer };
