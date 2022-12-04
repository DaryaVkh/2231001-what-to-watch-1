import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../common/models';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';
import { User } from '../types/user.type';
import { changeActiveGenre, changeAuthStatus, loadFilms, setLoading, setUserInfo } from './action';

type InitialState = {
  genre: Genre;
  films: Film[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  genre: Genre.ALL_GENRES,
  films: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null
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
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
