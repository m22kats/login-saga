import { authService } from '@services/auth/auth.service';
import { LoginResponse } from '../../../../services/auth/auth.service.type';
import { Response } from '@src/services/type';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginActions } from './login.slice';

function* logoutSaga() {
  try {
    yield call(authService.logout);
  } catch (error: any) {
    console.log(error);
  } finally {
    yield put(loginActions.resetLogin());
  }
}

export function* logoutWatcherSaga() {
  yield takeLatest(loginActions.logout.type, logoutSaga);
}
