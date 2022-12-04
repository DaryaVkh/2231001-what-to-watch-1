import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../common/models';
import { Film } from '../types/film.type';
import { AppDispatch, State } from '../types/state.type';
import { loadFilms, setLoading } from './action';

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
