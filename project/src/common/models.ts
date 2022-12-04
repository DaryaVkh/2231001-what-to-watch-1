export enum AppRoute {
  MAIN = '/',
  SIGN_IN = 'login',
  MY_LIST = 'mylist',
  FILM = 'films/:filmId',
  ADD_REVIEW = 'review',
  PLAYER = 'player/:filmId',
  ERROR404 = '*'
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export enum APIRoute {
  FILMS = '/films',
}

export const VISIBLE_FILMS_COUNT_STEP = 8;
