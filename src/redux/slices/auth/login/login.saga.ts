import { authService } from '@services/auth/auth.service';
import { LoginResponse } from '../../../../services/auth/auth.service.type';
import { Response } from '@src/services/type';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginActions } from './login.slice';
import { LoginActionType } from './login.types';

function* loginSaga(action: LoginActionType) {
  try {
    const response: Response<LoginResponse> = yield call(
      authService.login,
      action.payload.request
    );
    if (!response?.data?.items?.[0]) {
      throw new Error('Login failed');
    }
    yield put(
      loginActions.loginSuccess({
        response: response?.data?.items?.[0],
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      loginActions.loginFailure({ error: errorMessage || 'Login failed' })
    );
  } finally {
  }
}

export function* loginWatcherSaga() {
  yield takeLatest(loginActions.login.type, loginSaga);
}
