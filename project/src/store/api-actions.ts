import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AuthorizationStatus, MAX_SIMILAR_FILMS_COUNT } from '../common/models';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.type';
import { Film } from '../types/film.type';
import { Review } from '../types/review.type';
import { AppDispatch, State } from '../types/state.type';
import { User } from '../types/user.type';
import {
  setAuthorizationStatusAction,
  setFavoriteFilmsAction,
  setFilmAction,
  setFilmReviewsAction,
  setFilmsAction,
  setIsLoadingAction,
  setPromoFilmAction,
  setSimilarFilmsAction,
  setUserAction
} from './actions';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsLoadingAction(true));

    try {
      const { data } = await api.get<Film[]>(APIRoute.Films);
      dispatch(setFilmsAction(data));
    } catch {
      dispatch(setFilmsAction([]));
      toast.error('Can`t load films');
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: user } = await api.get<User>(APIRoute.Login);
      dispatch(setUserAction(user));
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
      dispatch(setUserAction(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data: user } = await api.post<User>(APIRoute.Login, { email, password });
      saveToken(user.token);
      dispatch(setUserAction(user));
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.Auth));
    } catch {
      toast.error('Can`t login');
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setUserAction(null));
      dispatch(setAuthorizationStatusAction(AuthorizationStatus.NoAuth));
      dispatch(setFavoriteFilmsAction([]));
    } catch {
      toast.error('Can`t logout');
    }
  },
);

export const fetchFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilm',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
      dispatch(setFilmAction(data));
    } catch {
      dispatch(setFilmAction(null));
      dispatch(setSimilarFilmsAction([]));
      dispatch(setFilmReviewsAction([]));
      toast.error('Can`t load film');
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchSimilarFilms',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film[]>(`${APIRoute.Films}/${filmId}/similar`);
      dispatch(setSimilarFilmsAction(data.splice(0, MAX_SIMILAR_FILMS_COUNT)));
    } catch {
      toast.error('Can`t load similar films');
    }
  },
);

export const fetchFilmReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilmReviews',
  async (filmId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${filmId}`);
      dispatch(setFilmReviewsAction(data));
    } catch {
      toast.error('Can`t load film reviews');
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film>(APIRoute.Promo);
      dispatch(setPromoFilmAction(data));
    } catch {
      toast.error('Can`t load promo film');
    }
  },
);

export const postFilmReviewAction = createAsyncThunk<void, { filmId: number, review: { comment: string, rating: number } }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'app/postFilmReview',
  async (newReviewData, { extra: api }) => {
    try {
      await api.post<Review>(`${APIRoute.Comments}/${newReviewData.filmId}`, { ...newReviewData.review });
    } catch {
      toast.error('Can`t post review');
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/fetchFavoriteFilms',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film[]>(APIRoute.Favorite);
      dispatch(setFavoriteFilmsAction(data));
    } catch {
      toast.error('Can`t load favorite films');
    }
  }
);

export const changeFilmStatusAction = createAsyncThunk<void, { filmId: number, isFavorite: boolean }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/changeFilmStatus',
  async (newFilmStatusData, { extra: api }) => {
    const { filmId, isFavorite } = newFilmStatusData;
    try {
      await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${isFavorite ? 1 : 0}`);
    } catch {
      toast.error(`Can\`t ${isFavorite ? 'add' : 'delete'} film ${isFavorite ? 'to' : 'from'} favorites`);
    }
  }
);
