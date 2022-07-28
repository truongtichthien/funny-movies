import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {ACTION_TYPE} from '../constants';

import {apiLogin} from '../api';
import {loginSuccess, loginError} from './action';

function* performLogin({payload}) {
  try {
    const {username, password} = payload;
    const response = yield call(apiLogin, {username, password});
    const {data: {authenticated, user, accessToken}} = response;
    console.log(authenticated, user);
    yield put(loginSuccess({authenticated, user, token: accessToken}));
  } catch (error) {
    yield put(loginError());
  } finally {
  }
}

function* watchLogin() {
  yield takeLatest(ACTION_TYPE.LOG_IN, performLogin);
}

export default function* rootSaga() {
  yield all([
    watchLogin()
  ]);
}
