import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../common/models';
import { AuthData } from '../types/auth-data.type';
import { Film } from '../types/film.type';
import { Review } from '../types/review.type';
import { AppDispatch, State } from '../types/state.type';
import { User } from '../types/user.type';

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data: user } = await api.get<User>(APIRoute.Login);
    return user;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data: user } = await api.post<User>(APIRoute.Login, { email, password });
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  },
);

export const fetchFilm = createAsyncThunk<Film, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilm',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<Film[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchSimilarFilms',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Film[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchFilmReviews = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilmReviews',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${filmId}`);
    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

export const postFilmReview = createAsyncThunk<Review, {filmId: number, review: { comment: string, rating: number }}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/postFilmReview',
  async (newReviewData, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${newReviewData.filmId}`, {...newReviewData.review});
    return data;
  },
);
