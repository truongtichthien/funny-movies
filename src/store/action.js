import {ACTION_TYPE} from '../constants';

export const login = ({username, password}) => ({
  type: ACTION_TYPE.LOG_IN,
  payload: {username, password}
});

export const loginSuccess = ({authenticated, user, token}) => ({
  type: ACTION_TYPE.LOG_IN_SUCCESS,
  payload: {authenticated, user, token}
});

export const loginError = () => ({
  type: ACTION_TYPE.LOG_IN_ERROR
});

export const logout = () => ({
  type: ACTION_TYPE.LOG_OUT
});

export const getVideos = () => ({
  type: ACTION_TYPE.GET_VIDEOS
});

export const getVideosLoading = ({status}) => ({
  type: ACTION_TYPE.GET_VIDEOS_LOADING,
  status
});

export const getVideosSuccess = ({videos}) => ({
  type: ACTION_TYPE.GET_VIDEOS_SUCCESS,
  videos
});

export const getVideosError = () => ({
  type: ACTION_TYPE.GET_VIDEOS_ERROR
});

export const voteVideo = ({videoId, value}) => ({
  type: ACTION_TYPE.VOTE_VIDEO,
  videoId,
  value
});

export const voteVideoSuccess = ({vote}) => ({
  type: ACTION_TYPE.VOTE_VIDEO_SUCCESS,
  vote
});

export const voteVideoError = () => ({
  type: ACTION_TYPE.VOTE_VIDEO_ERROR
});

