import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../common/models';
import { UserState } from '../../types/state.type';
import { setAuthorizationStatusAction, setFavoriteFilmsAction, setUserAction } from '../actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  favoriteFilms: []
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setUserAction, (state, action) => {
        state.user = action.payload;
      })
      .addCase(setAuthorizationStatusAction, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setFavoriteFilmsAction, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});
