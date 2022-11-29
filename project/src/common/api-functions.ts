import { api } from '../store';
import { Film } from '../types/film.type';
import { Review } from '../types/review.type';
import { APIRoute } from './models';

export const getFilm = async (filmId: number) => await api.get<Film>(`${APIRoute.FILMS}/${filmId}`);

export const getSimilarFilms = async (filmId: number) => await api.get<Film[]>(`${APIRoute.FILMS}/${filmId}/similar`);

export const getFilmReviews = async (filmId: number) => await api.get<Review[]>(`${APIRoute.COMMENTS}/${filmId}`);

export const postFilmReview = async (filmId: number, review: { comment: string, rating: number }) => await api.post<Review[]>(`${APIRoute.COMMENTS}/${filmId}`, {...review});
