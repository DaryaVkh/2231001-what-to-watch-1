export enum AppRoute {
  Main = '/',
  SignIn = 'login',
  MyList = 'mylist',
  Film = 'films/:id',
  AddReview = 'review',
  Player = 'player/:id',
  Error404 = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
