export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = 'mylist',
  Film = 'films/:filmId',
  AddReview = 'review',
  Player = 'player/:filmId',
  Error404 = '*'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
  Favorite = '/favorite'
}

export enum NameSpace {
  User = 'User',
  App = 'App',
  Film = 'Film'
}
