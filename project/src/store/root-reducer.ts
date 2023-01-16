import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common/models';
import { appReducer } from './app-reducer/app-reducer';
import { filmReducer } from './film-reducer/film-reducer';
import { userReducer } from './user-reducer/user-reducer';

const rootReducer = combineReducers({
  [NameSpace.App]: appReducer.reducer,
  [NameSpace.User]: userReducer.reducer,
  [NameSpace.Film]: filmReducer.reducer
});

export { rootReducer };
