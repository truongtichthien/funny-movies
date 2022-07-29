import {combineReducers} from 'redux';
import {ACTION_TYPE} from '../constants';

const createReducer = (initialState, handlers) => (state = initialState, action) => (Object.prototype.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state);

const loggedIn = 'loggedIn';
const currentUser = 'currentUser';
const loading = 'loading';
const failed = 'failed';

const initialAuth = {
  [loggedIn]: false,
  [currentUser]: {},
  [loading]: false,
  [failed]: false
};

const handlersAuth = {
  [ACTION_TYPE.LOG_IN_LOADING]: (state, {status}) => {
    return {...state, [loading]: status};
  },
  [ACTION_TYPE.LOG_IN_SUCCESS]: (state, {payload: {authenticated, user, token}}) => {
    document.cookie = `fm-access-token=${token};`;
    return {...state, [loggedIn]: authenticated, [currentUser]: {...user, token}, [loading]: false};
  },
  [ACTION_TYPE.LOG_IN_ERROR]: (state) => {
    document.cookie = 'fm-access-token=;';
    return {...state, [loggedIn]: false, [currentUser]: {}, [failed]: true};
  },
  [ACTION_TYPE.LOG_OUT]: (state) => {
    document.cookie = 'fm-access-token=;';
    return {...state, [loggedIn]: false, [currentUser]: {}, [failed]: false};
  }
};

const authReducer = createReducer(initialAuth, handlersAuth);

// ~~~~~

const list = 'list';

const initialVideo = {
  [list]: {},
  [loading]: false
};

const handlersVideo = {
  [ACTION_TYPE.GET_VIDEOS_LOADING]: (state, {status}) => {
    return {...state, [loading]: status};
  },
  [ACTION_TYPE.GET_VIDEOS_SUCCESS]: (state, {videos}) => {
    return {...state, [loading]: false, list: videos.reduce((acc, ele) => ({...acc, [ele.id]: {...ele}}), {})};
  },
  [ACTION_TYPE.GET_VIDEOS_ERROR]: (state) => {
    return state;
  },
  [ACTION_TYPE.VOTE_VIDEO_SUCCESS]: (state, {vote}) => {
    const {vote: value, video: {id: videoId}, user: {_id: userId}} = vote;
    const videoEntity = state[list][videoId];
    const {votedBy} = videoEntity;
    const hasVotedIndex = votedBy.findIndex((v) => v.user === userId);
    let voted;
    if (hasVotedIndex < 0) {
      // insert new vote
      voted = [...votedBy, {user: userId, vote: value}];
    } else {
      // update existing vote
      voted = [...votedBy];
      voted[hasVotedIndex].vote = value;
    }
    return {...state, list: {...state.list, [videoId]: {...videoEntity, votedBy: [...voted]}}};
  },
  [ACTION_TYPE.VOTE_VIDEO_ERROR]: (state) => {
    return state;
  }
};

const videosReducer = createReducer(initialVideo, handlersVideo);

export default combineReducers({authentication: authReducer, videos: videosReducer});
