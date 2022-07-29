import {
  all, call, put, takeLatest, select
} from 'redux-saga/effects';
import {ACTION_TYPE} from '../constants';

import {apiGetVideos, apiLogin, apiVoteVideo} from '../api';
import {
  loginLoading, loginSuccess, loginError,
  getVideosLoading, getVideosSuccess, getVideosError,
  voteVideoSuccess, voteVideoError
} from './action';

function* performLogin({payload}) {
  yield put(loginLoading({status: true}));
  try {
    const {username, password} = payload;
    const response = yield call(apiLogin, {username, password});
    const {data: {authenticated, user, accessToken, _id}} = response;
    yield put(loginSuccess({authenticated, user, _id, token: accessToken}));
  } catch (error) {
    yield put(loginError());
  } finally {
    yield put(loginLoading({status: false}));
  }
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

function* performVoteVideo({videoId, value}) {
  try {
    const userId = yield select(({authentication: {currentUser: {_id}}}) => _id);
    const response = yield call(apiVoteVideo, {videoId, userId, value})
    const {data} = response;
    yield put(voteVideoSuccess({vote: data}));
  } catch (error) {
    yield put(voteVideoError());
  }
}

function* watchLogin() {
  yield takeLatest(ACTION_TYPE.LOG_IN, performLogin);
}

function* watchGetVideos() {
  yield takeLatest(ACTION_TYPE.GET_VIDEOS, performGetVideos);
}

function* watchVoteVideo() {
  yield takeLatest(ACTION_TYPE.VOTE_VIDEO, performVoteVideo);
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchGetVideos(),
    watchVoteVideo()
  ]);
}
