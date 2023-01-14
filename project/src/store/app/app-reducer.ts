import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/models';
import { Genre } from '../../types/genre.enum';
import { AppState } from '../../types/state.type';
import { changeActiveGenre, loadFilms, setLoading } from '../action';
import { fetchFilmsAction, fetchPromoFilm } from '../api-actions';

const initialState: AppState = {
  genre: Genre.ALL_GENRES,
  films: [],
  isLoading: false,
  promoFilm: null
};

export const appReducer = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeActiveGenre, (state, action) => {
        state.genre = action.payload.newGenre;
      })
      .addCase(loadFilms, (state, action) => {
        state.films = action.payload;
      })
      .addCase(setLoading, (state, action) => {
        state.isLoading = action.payload;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      });
  }
});
