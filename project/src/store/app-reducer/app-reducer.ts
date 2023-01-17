import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/enums';
import { Genre } from '../../types/genre.enum';
import { AppState } from '../../types/state.type';
import { setActiveGenreAction, setFilmsAction, setIsLoadingAction, setPromoFilmAction } from '../actions';

const initialState: AppState = {
  genre: Genre.AllGenres,
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
      .addCase(setFilmsAction, (state, action) => {
        state.films = action.payload;
      })
      .addCase(setActiveGenreAction, (state, action) => {
        state.genre = action.payload.newGenre;
      })
      .addCase(setIsLoadingAction, (state, action) => {
        state.isLoading = action.payload;
      })
      .addCase(setPromoFilmAction, (state, action) => {
        state.promoFilm = action.payload;
      });
  }
});
