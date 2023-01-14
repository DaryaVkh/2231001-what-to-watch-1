import { AuthorizationStatus } from '../common/models';
import { store } from '../store';
import { Film } from './film.type';
import { Genre } from './genre.enum';
import { Review } from './review.type';
import { User } from './user.type';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type FilmState = {
  film: Film | null;
  reviews: Review[];
  similarFilms: Film[];
};

export type AppState = {
  genre: Genre;
  films: Film[];
  isLoading: boolean;
  promoFilm: Film | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
