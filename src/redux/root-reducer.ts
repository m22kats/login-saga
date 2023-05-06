import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from './slices/auth/login/login.slice';

const rootReducer = combineReducers({
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
