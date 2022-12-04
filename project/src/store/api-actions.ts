import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../common/models';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.type';
import { Film } from '../types/film.type';
import { AppDispatch, State } from '../types/state.type';
import { User } from '../types/user.type';
import { changeAuthStatus, loadFilms, redirectToRoute, setLoading, setUserInfo } from './action';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film[]>(APIRoute.FILMS);
    dispatch(setLoading(true));
    dispatch(loadFilms(data));
    dispatch(setLoading(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.LOGIN);
      dispatch(changeAuthStatus(AuthorizationStatus.AUTH));
    } catch {
      dispatch(changeAuthStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: user } = await api.post<User>(APIRoute.LOGIN, {email, password});
    saveToken(user.token);
    dispatch(changeAuthStatus(AuthorizationStatus.AUTH));
    dispatch(setUserInfo(user));
    dispatch(redirectToRoute(AppRoute.MAIN));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.LOGOUT);
    dropToken();
    dispatch(changeAuthStatus(AuthorizationStatus.NO_AUTH));
    dispatch(setUserInfo(null));
    dispatch(redirectToRoute(AppRoute.MAIN));
  },
);
