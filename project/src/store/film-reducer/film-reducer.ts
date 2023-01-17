import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/enums';
import { FilmState } from '../../types/state.type';
import { setFilmAction, setFilmReviewsAction, setSimilarFilmsAction } from '../actions';

const initialState: FilmState = {
  film: null,
  reviews: [],
  similarFilms: []
};

export const filmReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setFilmAction, (state, action) => {
        state.film = action.payload;
      })
      .addCase(setSimilarFilmsAction, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(setFilmReviewsAction, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
