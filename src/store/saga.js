import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {ACTION_TYPE} from '../constants';

import {apiGetVideos, apiLogin} from '../api';
import {
  loginSuccess, loginError,
  getVideosLoading, getVideosSuccess, getVideosError
} from './action';

function* performLogin({payload}) {
  try {
    const {username, password} = payload;
    const response = yield call(apiLogin, {username, password});
    const {data: {authenticated, user, accessToken}} = response;
    yield put(loginSuccess({authenticated, user, token: accessToken}));
  } catch (error) {
    yield put(loginError());
  } finally {
  }
}

function* watchLogin() {
  yield takeLatest(ACTION_TYPE.LOG_IN, performLogin);
}

function* performGetVideos() {
  yield put(getVideosLoading({status: true}));
  try {
    const response = yield call(apiGetVideos)
    const {data} = response;
    yield put(getVideosSuccess({videos: data}));
  } catch (error) {
    yield put(getVideosError());
  } finally {
    yield put(getVideosLoading({status: false}));
  }
}

function* watchGetVideos() {
  yield takeLatest(ACTION_TYPE.GET_VIDEOS, performGetVideos);
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchGetVideos()
  ]);
}
