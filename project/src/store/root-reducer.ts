import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common/models';
import { appReducer } from './app/app-reducer';
import { filmReducer } from './film/film-reducer';
import { userReducer } from './user/user-reducer';

const rootReducer = combineReducers({
  [NameSpace.App]: appReducer.reducer,
  [NameSpace.User]: userReducer.reducer,
  [NameSpace.Film]: filmReducer.reducer
});

export { rootReducer };
