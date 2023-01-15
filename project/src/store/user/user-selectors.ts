import { AuthorizationStatus, NameSpace } from '../../common/models';
import { Film } from '../../types/film.type';
import { State } from '../../types/state.type';
import { User } from '../../types/user.type';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User | null => state[NameSpace.User].user;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.User].favoriteFilms;
