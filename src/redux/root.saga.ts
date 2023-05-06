import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { loginWatcherSaga } from './slices/auth/login/login.saga';
import { logoutWatcherSaga } from './slices/auth/login/logout.saga';

export const rootSagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([loginWatcherSaga(), logoutWatcherSaga()]);
}
